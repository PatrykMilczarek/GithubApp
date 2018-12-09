import * as React from "react";
import axios from "axios";
import { Form, Input, Button } from "antd";

import { IUserBasicInfo, IUserRepository} from "../App";

const FormItem = Form.Item;

interface ISearchFormState {
  value: string
  error: string
}

interface ISearchFormProps {
  setLoading: Function
  getUserDataURL: Function
  getUserReposURL: Function
  updateUserData: Function
}

interface ISubmitFormReturn {
  userData?: IUserBasicInfo 
  userRepositories?: IUserRepository
  error?: string
}

//Decided to use mocked labels, API error message response is too poor
const ERROR_LABELS: any = {
    "404": "User was not found.",
    "default": "Oops! Something went wrong. Please try again."
}

export default class SearchForm extends React.Component<ISearchFormProps, ISearchFormState> {

  constructor(props: ISearchFormProps) {
    super(props);

    this.state = {
      value: "",
      error: ""
    }
  }


  handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    this.props.setLoading(true);
    const {userData, userRepositories, error} = await this.submitForm();

    !error ? 
      this.props.updateUserData(true, userData, userRepositories):
      this.props.updateUserData(false)

    this.setState({error: error});
    this.props.setLoading(false);
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: e.currentTarget.value
    });
  };

  async submitForm(): Promise<ISubmitFormReturn> {
    try {
      const userDataResponse = await axios.get(
        this.props.getUserDataURL(this.state.value),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        }
      );

      const userRepositoriesResponse = await axios.get(
        this.props.getUserReposURL(this.state.value),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          params: {
            per_page: 100
          }
        }
      );

      return { userData: userDataResponse.data, userRepositories: userRepositoriesResponse.data };
      
    } catch (ex) {
      // ex.response.data.message has poor message
      return { error: ERROR_LABELS[ex.response.status] || ERROR_LABELS.default }
    }
  }

  render() {
    const { error, value } = this.state;
    return (
      <>
        <Form
          layout="inline"
          onSubmit={this.handleSubmit}
          className="searchform"
        >
          <FormItem>
            <Input
              className="searchform__input"
              placeholder="Search for user..."
              value={value}
              onChange={this.handleInputChange}
            />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" disabled={!value}>
              Search
            </Button>
          </FormItem>
        </Form>
        {error && (
          <h5 style={{ color: "red", textAlign: "center" }}>
            { error }
          </h5>
        )}
      </>
    );
  }
}
