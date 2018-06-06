import React from "react";
import { shallow, mount } from "enzyme";
import Counter from "./Counter";

describe("Counter component", () => {
  // TODO: add test for basic render

  // TODO: add test for increment button
  test("first button should call onIncrement", () => {
    const props = {
      value: 2,
      onIncrement: jest.fn(),
      onDecrement: jest.fn()
    };

    const wrapper = shallow(<Counter {...props} />);
    const buttons = wrapper.find("button");
    buttons.at(0).simulate("click");
    expect(props.onIncrement).toBeCalled();
  });

  // TODO: add test for decrement button

  // TODO: add test for third button, third button should call onIncrement when counter is odd
});
