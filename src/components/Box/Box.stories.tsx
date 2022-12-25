import { ComponentProps } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import Box from ".";

export default {
  title: "Box",
  component: Box,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Box>;

const defaultProps: ComponentProps<typeof Box> = {};

const Template: ComponentStory<typeof Box> = (args) => (
  <Box {...defaultProps} {...args} />
);

export const Primary = Template.bind({});
Primary.storyName = "Default";
