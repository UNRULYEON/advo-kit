import { ComponentProps } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Menu from ".";

export default {
  title: "Menu",
  component: Menu,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Menu>;

const defaultProps: ComponentProps<typeof Menu> = {};

const Template: ComponentStory<typeof Menu> = (args) => (
  <Menu {...defaultProps} {...args} />
);

export const Primary = Template.bind({});
Primary.storyName = "Default";
