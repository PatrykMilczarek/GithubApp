const API_URL = "https://api.github.com/users/";
import axios from "axios";

const JSONHeader = {
  "Content-Type": "application/json",
  Accept: "application/json"
};

const recordsPerPage = 100;

//Decided to use mocked labels, API error message response is too poor
export const ERROR_LABELS: any = {
  "404": "User was not found.",
  "default": "Oops! Something went wrong. Please try again."
}

class APIRequests {
  getUserData = (userLogin: string) => {
    return axios.get(`${API_URL}${userLogin}`, {
      headers: JSONHeader
    });
  };
  getUserRepos = (userLogin: string) => {
    return axios.get(`${API_URL}${userLogin}/repos`, {
      headers: JSONHeader,
      params: {
        per_page: recordsPerPage
      }
    });
  };
}



export default new APIRequests();
