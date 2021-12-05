import React from "react";
import ReactDOM from "react-dom";
import Enzyme, { shallow, render, mount } from "enzyme";
import SearchBar from "./SearchBar";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("SearchBar Component", () => {
  it("should render SearchBar Successfully", () => {
    const wrapper = shallow(<SearchBar />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
