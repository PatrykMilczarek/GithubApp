import * as UserContentTypes from "./UserContent.types";

export interface IAppState {
    userData: {
      basicInfo: UserContentTypes.IUserBasicInfo
      repositories: UserContentTypes.IUserRepository[]
    }
    showUserData: boolean
    loading: boolean
}