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

  export interface IUserContentProps {
    userData: {
      basicInfo: IUserBasicInfo
      repositories: IUserRepository[]
    }
  }