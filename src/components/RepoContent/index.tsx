import * as React from "react";
import { Table, Button, Input } from "antd";
import RepoTable from "./RepoTable";

import { IUserRepository } from "../../types/UserContent.types";
import {
  IRepoContentProps,
  IRepoContentState,
  IFormatedData
} from "../../types/RepoContent.types";

export default class RepoContent extends React.Component<IRepoContentProps,IRepoContentState> {
  constructor(props: IRepoContentProps) {
    super(props);

    this.state = {
      data: this.formatData(props.data),
      hiddenRowKeys: [],
      selectedRowKeys: [],
      selectedRows: []
    };
  }

  formatData = (rawReposData: IUserRepository[]) => {
    let data: IFormatedData[] = [];

    if (rawReposData) {
      data = rawReposData.map(
        ({
          id, name,
          description, forks,
          stargazers_count, updated_at,
          html_url
        }: IUserRepository) => ({
          key: id, name,
          description, forks,
          stargazers_count, updated_at: updated_at.substring(0, 10),
          html_url, hideRow: this.hideRow
        })
      );
      return data;
    }

    return [];
  };

  onSelectChange = (selectedRowKeys: number[], selectedRows: IFormatedData[]) => {
    this.setState({
      selectedRowKeys: selectedRowKeys,
      selectedRows: selectedRows
    });
  };

  hideRow = (recordKey: number) => {

    this.setState(prevState => {
      let hiddenRowKeys: number[] = [...prevState.hiddenRowKeys];
      let selectedRowKeys: number[] = [...prevState.selectedRowKeys];
      const data = prevState.data.filter(
        ({ key }: IFormatedData) => key !== recordKey 
          && (hiddenRowKeys = [...hiddenRowKeys, key]) 
          && (selectedRowKeys = selectedRowKeys.filter(key => key !== recordKey))
      );

      return {
        data,
        hiddenRowKeys,
        selectedRowKeys
      }
    });
  };

  hideMultipleRows = () => {
    this.setState((prevState: IRepoContentState) => {
      let hiddenRowKeys: number[] = [...prevState.hiddenRowKeys];
      const data = prevState.data.filter(
        ({ key }: IFormatedData) =>
          !(this.state.selectedRowKeys.indexOf(key) > -1) && // can't use includes() - doesn't work in IE11
          (hiddenRowKeys = [...hiddenRowKeys, key])
      );

      return {
        data,
        selectedRowKeys: [],
        hiddenRowKeys
      }
    });
  };

  showAllRows = () => {
    this.setState({
      data: this.formatData(this.props.data),
      selectedRowKeys: [],
      hiddenRowKeys: []
    });
  };

  handleOpenSelected = () => {
    this.state.selectedRows.forEach(({ html_url, name }: IFormatedData) =>
      window.open(html_url, name)
    );
  };

  filterTable = (event: any) => {
    const value = event.target.value;
    const originalData = this.formatData(this.props.data);
    let filteredData: IFormatedData[] = [];

    if (value) {
      filteredData = originalData.filter(
        ({ key, name, description }: IFormatedData) => {
          const nameMatches = name.toLowerCase().includes(value.toLowerCase());
          const descriptionMatches =
            description &&
            description.toLowerCase().includes(value.toLowerCase());
          return (nameMatches || descriptionMatches) && (this.state.hiddenRowKeys.indexOf(key) > 0);
        }
      );
    } else {
      filteredData = originalData.filter( 
        ({ key }: IFormatedData) => {
        return this.state.hiddenRowKeys.indexOf(key) > 0;
      });
    }

    this.setState({
      data: filteredData
    });
  };

  render() {
    const { selectedRowKeys, data } = this.state;
    return (
      <>
        <div className="repocontent" data-test="user-repositories">
          <Input
            className="repocontent__search"
            placeholder="Search using repository name or description..."
            onChange={this.filterTable}
            data-test="input-reposearch"
          />
          <Button
            className="repocontent__button"
            onClick={this.handleOpenSelected}
            disabled={!selectedRowKeys.length}
          >
            Open Selected
          </Button>
          <Button
            className="repocontent__button"
            onClick={this.hideMultipleRows}
            disabled={!selectedRowKeys.length}
          >
            Hide Selected
          </Button>
          <Button
            className="repocontent__button"
            onClick={this.showAllRows}
            disabled={!(this.props.data.length !== this.state.data.length)}
          >
            Show All
          </Button>
          <RepoTable
            data={data}
            selectedRowKeys={selectedRowKeys}
            onSelectChange={this.onSelectChange}
          />
        </div>
      </>
    );
  }
}
