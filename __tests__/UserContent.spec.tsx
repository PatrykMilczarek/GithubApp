import * as React from "react";
import { shallow, mount } from "enzyme";
import * as Joi from "joi";

import UserContent from "../src/components/UserContent";
import APIRequests from "../src/requests/APIRequests";

import { userBasicInfoMocked, userRepositoriesMocked } from "../__mocked__/mockedData";

const findBasedOnAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
};

test("user content renders", () => {
    const props = {
        userData: {
            basicInfo: userBasicInfoMocked,
            repositories: userRepositoriesMocked
        }
    };
    const wrapper = shallow(<UserContent {...props} />);
    const userBasicInfo = findBasedOnAttr(wrapper, "user-content");
    
    expect(userBasicInfo.length).toBe(1);
});

test("user basic info renders with data properly", () => {
    const props = {
        userData: {
            basicInfo: userBasicInfoMocked,
            repositories: userRepositoriesMocked
        }
    };
    const wrapper = mount(<UserContent {...props} />);
    const userBasicInfo = findBasedOnAttr(wrapper, "user-basicinfo").hostNodes();

    for(const prop in userBasicInfoMocked) {
        expect(userBasicInfo.html().includes(userBasicInfoMocked[prop])).toBe(true);
    }
});
