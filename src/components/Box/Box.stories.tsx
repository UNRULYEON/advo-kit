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

const defaultProps: ComponentProps<typeof Box> = {
  open: false,
  rotate: false,
};

const Template: ComponentStory<typeof Box> = (args) => (
  <div
    style={{
      perspective: "750px",
      perspectiveOrigin: "50% calc(50% - 150px)",
    }}
  >
    <Box {...defaultProps} {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.storyName = "Default";
Primary.args = {
  open: false,
  rotate: false,
};
