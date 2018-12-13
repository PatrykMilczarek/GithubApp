import * as React from "react";
import axios from "axios";
import * as Joi from "joi";

import APIRequests from "../src/requests/APIRequests";

describe("fetched user data from API is proper", () => {
  const userName = "PatrykMilczarek";

  test("fetches user data with proper format", async () => {
    const userData = APIRequests.getUserData(userName);
    const userRepositories = APIRequests.getUserRepos(userName);

    expect(userData).toBeTruthy();
    expect(userRepositories).toBeTruthy();

    const userBasicInfoSchema = Joi.object()
      .keys({
        login: Joi.string().required(),
        avatar_url: Joi.string().allow(null).required(),
        html_url: Joi.string().required(),
        followers: Joi.number().integer().required(),
        email: Joi.string().allow(null).required(),
        location: Joi.string().allow(null).required()
      }).options({ stripUnknown: true });

    const userReposSchema = Joi.array()
      .items(
        Joi.object().keys({
          id: Joi.number().integer().required(),
          name: Joi.string().required(),
          forks: Joi.number().integer().required(),
          description: Joi.string().allow(null).required(),
          stargazers_count: Joi.number().integer().required(),
          updated_at: Joi.string().required(),
          html_url: Joi.string().allow(null).required()
        })
      ).options({ stripUnknown: true });

    const { error: userDataError } = Joi.validate(
      userData.data,
      userBasicInfoSchema
    );
    const { error: userRepoError } = Joi.validate(
      userRepositories.data,
      userReposSchema
    );
    expect(userDataError).toBe(null);
    expect(userRepoError).toBe(null);
  });

});




