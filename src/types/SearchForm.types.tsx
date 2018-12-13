import * as UserContentTypes from "./UserContent.types";

export interface ISearchFormState {
    value: string
    error: string
}
  
export interface ISearchFormProps {
    setLoading: Function
    updateUserData: Function
}
  
export interface ISubmitFormReturn {
    userData?: UserContentTypes.IUserBasicInfo 
    userRepositories?: UserContentTypes.IUserRepository
    error?: string
}