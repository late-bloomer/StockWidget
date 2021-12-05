import React from "react";
import ReactDOM from "react-dom";
import Enzyme, { shallow, render, mount } from "enzyme";
import StockDetails from "./StockDetails";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("StockDetails Component", () => {
  it("should render StockDetails Successfully", () => {
    const wrapper = shallow(<StockDetails />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
