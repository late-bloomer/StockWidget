import React from "react";
import ReactDOM from "react-dom";
import Enzyme, { shallow, render, mount } from "enzyme";
import StockPickerWidget from "./StockPickerWidget";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("StockPickerWidget Component", () => {
  it("should render StockPickerWidget Successfully", () => {
    const wrapper = shallow(<StockPickerWidget />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
