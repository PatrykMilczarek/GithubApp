import * as React from "react";
import axios from "axios";
import { Form, Input, Button } from "antd";
import APIRequests, { ERROR_LABELS } from "../../requests/APIRequests";
import { ISearchFormProps, ISearchFormState, ISubmitFormReturn } from "../../types/SearchForm.types";


const FormItem = Form.Item;

export default class SearchForm extends React.Component<ISearchFormProps, ISearchFormState> {

    state = {
      value: "",
      error: ""
    }
  
  handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    this.props.setLoading(true);
    const {userData, userRepositories, error} = await this.submitForm();

    !error ? 
      this.props.updateUserData(true, userData, userRepositories):
      this.props.updateUserData(false)

    this.setState({ error });
    this.props.setLoading(false);
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: e.currentTarget.value
    });
  };

  async submitForm(): Promise<ISubmitFormReturn> {
    try {
      const userDataResponse = await APIRequests.getUserData(this.state.value);
      const userRepositoriesResponse = await APIRequests.getUserRepos(this.state.value);

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
