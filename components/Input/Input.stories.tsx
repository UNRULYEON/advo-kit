import { ComponentProps } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import ArrowDownIcon from "@/icons/ArrowDownIcon";
import SearchIcon from "@/icons/SearchIcon";

import Input from ".";

export default {
  title: "Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Input>;

const defaultProps: ComponentProps<typeof Input> = {
  placeholder: "Placeholder",
};

const Template: ComponentStory<typeof Input> = (args) => (
  <Input {...defaultProps} {...args} />
);

export const Primary = Template.bind({});
Primary.storyName = "Default";

export const LeadingIcon = Template.bind({});
LeadingIcon.storyName = "Leading icon";
LeadingIcon.args = {
  leadingIcon: <ArrowDownIcon className="fill-coolblue" />,
};

export const TrailingIcon = Template.bind({});
TrailingIcon.storyName = "Trailing icon";
TrailingIcon.args = {
  trailingIcon: <SearchIcon className="fill-coolblue" />,
};
