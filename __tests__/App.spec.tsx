import * as React from "react";
import { shallow } from "enzyme";
import axios from "axios";

import App from "../src/components/App";
import APIRequests from "../src/requests/APIRequests";

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);

  if (state) wrapper.setState(state);

  return wrapper;
};

const findBasedOnAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
};

test("layout renders without error", () => {
  const wrapper = setup();
  const appComponent = findBasedOnAttr(wrapper, "layout-component");
  expect(appComponent.length).toBe(1);
});

test("layout content renders without error", () => {
  const wrapper = setup();
  const layoutContent = findBasedOnAttr(wrapper, "layout-content");
  expect(layoutContent.length).toBe(1);
});

test("layout searchform renders without error", () => {
  const wrapper = setup();
  const layoutSearchForm = findBasedOnAttr(wrapper, "layout-searchform");
  expect(layoutSearchForm.length).toBe(1);
});
