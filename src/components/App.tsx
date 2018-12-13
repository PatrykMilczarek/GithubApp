import * as React from "react";
import { Layout } from "antd";
import classnames from "classnames";
import SearchForm from "../components/SearchForm";
import UserContent from "../components/UserContent";
import withLoaderHOC from "./hocs/withLoaderHOC";

import * as AppTypes from "../types/App.types";
import * as UserContentTypes from "../types/UserContent.types";

import "antd/dist/antd.css";
import "./App.scss";

const ContentWithLoader = withLoaderHOC(UserContent);
export default class App extends React.Component<{}, AppTypes.IAppState> {
  state = {
    userData: {
      basicInfo: {} as UserContentTypes.IUserBasicInfo,
      repositories: [] as UserContentTypes.IUserRepository[]
    },
    showUserData: false,
    loading: false
  };


  updateUserData = (success: boolean, userBasicInfo: UserContentTypes.IUserBasicInfo, userRepos: UserContentTypes.IUserRepository[]) => {
    const userData = {...this.state.userData};
    userData.basicInfo = userBasicInfo;
    userData.repositories = userRepos;

    this.setState({
      userData,
      showUserData: success
    });
  }

  setLoading = (isLoading: boolean) => {
    this.setState({
      loading: isLoading
    });
  };

  render() {
    const { userData, loading, showUserData } = this.state;

    return (
      <Layout className="layout" data-test="layout-component">
        <h1 className={classnames("header", { "header--marginTop": !showUserData})}>
          GitHub App
        </h1>
        <Layout.Content className="layout__content" data-test="layout-content">
          <SearchForm
            updateUserData={this.updateUserData}
            setLoading={this.setLoading}
            data-test="layout-searchform"
          />
          {showUserData && (
            <ContentWithLoader isLoading={loading} userData={userData} />
          )}
        </Layout.Content>
      </Layout>
    );
  }
}
