import { ComponentProps } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Dropdown from ".";

export default {
  title: "Dropdown",
  component: Dropdown,
  argTypes: {},
  args: {
    active: false,
  },
} as ComponentMeta<typeof Dropdown>;

const defaultProps: ComponentProps<typeof Dropdown> = {
  currentItem: { id: "stakeholder-meeting", name: "Stakeholder meeting" },
  items: [
    { id: "stakeholder-meeting", name: "Stakeholder meeting" },
    { id: "design-pitch", name: "Design pitch" },
    { id: "developer-kick-off", name: "Developer kick-off" },
    { id: "soon", name: "Soon...", disabled: true },
  ],
};

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown {...defaultProps} {...args} />
);

export const Primary = Template.bind({});
Primary.storyName = "Default";
