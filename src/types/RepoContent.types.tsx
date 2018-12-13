import * as UserContentTypes from "./UserContent.types";

export interface IRepoContentState {
  data: IFormatedData[];
  hiddenRowKeys: number[];
  selectedRowKeys: number[];
  selectedRows: IFormatedData[];
}

export interface IRepoContentProps {
  data: UserContentTypes.IUserRepository[];
}

export interface IFormatedData {
  key: number;
  name: string;
  description: string;
  forks: number;
  stargazers_count: number;
  updated_at: string;
  html_url: string;
  hideRow?: Function;
}
