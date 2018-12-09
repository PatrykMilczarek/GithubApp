import * as React from "react";
import { Table, Button, Input } from "antd";
import { repositoryTableColumns } from "./config";
import { IUserRepository } from "../App";

interface IRepoContentState {
  data: IFormatedData[]
  selectedRowKeys: number[]
  selectedRows: IFormatedData[]
  areRowsHidden: boolean
}

interface IRepoContentProps {
  data: IUserRepository[]
}

export interface IFormatedData {
  key: number
  name: string
  description: string
  forks: number
  stargazers_count: number
  updated_at: string
  html_url: string
  hideRow?: Function
}
export default class RepoContent extends React.Component<IRepoContentProps, IRepoContentState > {

  constructor(props: IRepoContentProps) {
    super(props);

    this.state = {
      data: [],
      selectedRowKeys: [],
      selectedRows: [],
      areRowsHidden: false
    }
  }

  componentDidMount() {
    this.setState({
      data: this.formatData(this.props.data)
    })
  }

  formatData = (rawReposData: IUserRepository[]) => {
    const data: IFormatedData[] = [];

    if (rawReposData && rawReposData.length) {
      rawReposData.forEach((repo: IUserRepository) => {
        data.push({
          key: repo.id,
          name: repo.name,
          description: repo.description,
          forks: repo.forks,
          stargazers_count: repo.stargazers_count,
          updated_at: repo.updated_at.substring(0, 10),
          html_url: repo.html_url,
          hideRow: this.hideRow
        });
      });
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

  hideRow = (recordId: number) => {
    this.setState((prevState: IRepoContentState) => ({
      data: prevState.data.filter(({ key }: IFormatedData) => key !== recordId),
      areRowsHidden: true
    }));
  };

  hideMultipleRows = () => {
    this.setState((prevState: IRepoContentState) => ({
      data: prevState.data.filter(
        ({ key }: IFormatedData) => !this.state.selectedRowKeys.includes(key)
      ),
      areRowsHidden: true
    }));
  };

  showAllRows = () => {
    this.setState({
      data: this.formatData(this.props.data),
      selectedRowKeys: [],
      areRowsHidden: false
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
    let newData: IFormatedData[] = [];

    if (value) {
      newData = originalData.filter(({ name, description }: IFormatedData) => {
        const nameMatches = name.toLowerCase().includes(value.toLowerCase());
        const descriptionMatches =
          description &&
          description.toLowerCase().includes(value.toLowerCase());
        return nameMatches || descriptionMatches;
      });
    } else {
      newData = originalData;
    }

    this.setState({
      data: newData
    });
  };

  render() {
    const { selectedRowKeys, areRowsHidden } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
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
            disabled={!areRowsHidden}
          >
            Show All
          </Button>
          <Table
            rowSelection={rowSelection}
            dataSource={this.state.data}
            columns={repositoryTableColumns}
            size="small"
            style={{marginTop: "20px"}}
        />
        </div>
      </>
    );
  }
}
