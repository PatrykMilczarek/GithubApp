const API_URL = "https://api.github.com/users/";

const APIRequests = {
    getUserDataURL: (userLogin: string) => `${API_URL}${userLogin}`,
    getUserReposURL: (userLogin: string) => `${API_URL}${userLogin}/repos`
}

export default APIRequests;