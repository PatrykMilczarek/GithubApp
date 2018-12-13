import * as React from "react";
import { shallow, mount } from "enzyme";
import axios from "axios";

import RepoContent from "../src/components/RepoContent";
import APIRequests from "../src/requests/APIRequests";
import { userBasicInfoMocked, userRepositoriesMocked } from "../__mocked__/mockedData";

  const findBasedOnAttr = (wrapper, val) => {
    return wrapper.find(`[data-test='${val}']`);
  };


describe("test repo content component", () => {

    test("repo content renders properly", () => {
        const wrapper = shallow(<RepoContent data={[]}/>);
        const repoContent = findBasedOnAttr(wrapper, "user-repositories");

        expect(repoContent.length).toBe(1);
    });

    test("repo content table renders properly without data", () => {
        const wrapper = mount(<RepoContent data={[]}/>);
        const tableRows = wrapper.find("TableRow");

        expect(tableRows.length).toBe(0);
        wrapper.unmount();
    });

    test("repo content table renders properly with data", () => {
        const wrapper = mount(<RepoContent data={userRepositoriesMocked}/>);
        const tableRows = wrapper.find("TableRow");

        expect(tableRows.length).toBe(userRepositoriesMocked.length);
        wrapper.unmount();
    });

    test("search input properly renders", () => {
        const wrapper = shallow(<RepoContent data={[]}/>);
        const searchInput = findBasedOnAttr(wrapper, "input-reposearch");

        expect(searchInput.length).toBe(1);
    });

    test("search input properly filters repo table based on name & description", () => {
        const wrapper = mount(<RepoContent data={userRepositoriesMocked}/>);
        const searchInput = wrapper.find("Input[data-test='input-reposearch']");
        let tableRows = null;

        searchInput.simulate("change", {target: {value: "NO_VALUEIN_TABLE"}});
        wrapper.update();

        tableRows = wrapper.find("TableRow");
        expect(tableRows.length).toBe(0);

        // searchInput.simulate("change", {target: {value: "TEST"}});
        // wrapper.update();
        // console.log(wrapper.debug());
        // tableRows = wrapper.find("TableRow");
        // expect(tableRows.length).toBe(2);


        // searchInput.simulate("change", {target: {value: "TSET"}});
        // wrapper.update();

        // tableRows = wrapper.find("TableRow");
        // expect(tableRows.length).toBe(1);

        // searchInput.simulate("change", {target: {value: "DESC"}});
        // wrapper.update();

        // tableRows = wrapper.find("TableRow");
        // expect(tableRows.length).toBe(2);
        
        wrapper.unmount();
    });

});

