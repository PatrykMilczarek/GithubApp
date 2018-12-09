import * as React from "react";
import { Layout } from "antd";
import classnames from "classnames";
import APIRequests from "../requests/APIRequests";
import SearchForm from "../components/SearchForm";
import UserContent from "../components/UserContent";
import withLoaderHOC from "./hocs/withLoaderHOC";

import "antd/dist/antd.css";
import "./App.scss";

const ContentWithLoader = withLoaderHOC(UserContent);

export interface IUserBasicInfo {
  login: string
  avatar_url: string
  html_url: string
  followers: number
  email: string
  location: string
  [key: string]: any
}

export interface IUserRepository {
  id: number
  name: string
  forks: number
  description: string
  stargazers_count: number
  updated_at: string
  html_url: string
}

interface IAppState {
  userData: {
    basicInfo: IUserBasicInfo
    repositories: IUserRepository[]
  }
  showUserData: boolean
  loading: boolean
}

export default class App extends React.Component<{}, IAppState> {
  state: IAppState = {
    userData: {
      basicInfo: {} as IUserBasicInfo,
      repositories: [] as IUserRepository[]
    },
    showUserData: false,
    loading: false
  };


  updateUserData = (success: boolean, userBasicInfo: IUserBasicInfo, userRepos: IUserRepository[]) => {
    const newUserData = this.state.userData;
    newUserData.basicInfo = userBasicInfo;
    newUserData.repositories = userRepos;

    this.setState({
      userData: newUserData,
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
            getUserDataURL={APIRequests.getUserDataURL}
            getUserReposURL={APIRequests.getUserReposURL}
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
