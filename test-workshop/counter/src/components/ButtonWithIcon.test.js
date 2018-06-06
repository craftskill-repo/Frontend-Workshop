import React from "react";
import { shallow, render, mount } from "enzyme";
import ButtonWithIcon from "./ButtonWithIcon";

describe("ButtonWithIcon component", () => {
  test("Render ButtonWithIcon component with shollow", () => {
    const wrapper = shallow(
      <ButtonWithIcon icon="coffee">Hey, Jest!</ButtonWithIcon>
    );
    expect(wrapper).toMatchSnapshot();
  });
  test("Render ButtonWithIcon component with static render", () => {
    const wrapper = render(
      <ButtonWithIcon icon="coffee">Hey, Jest!</ButtonWithIcon>
    );
    expect(wrapper).toMatchSnapshot();
  });
  test("Render ButtonWithIcon component with mount", () => {
    const wrapper = mount(
      <ButtonWithIcon icon="coffee">Hey, Jest!</ButtonWithIcon>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
