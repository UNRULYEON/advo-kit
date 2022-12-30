import { ComponentProps } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Box from '.';

export default {
  title: 'Box',
  component: Box,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    width: {
      name: 'Width',
      defaultValue: 200,
      description: 'Width of the box',
      type: 'number',
    },
    height: {
      name: 'Height',
      defaultValue: 200,
      description: 'Height of the box',
      type: 'number',
    },
    thickness: {
      name: 'Thickness',
      defaultValue: 20,
      description: 'Thickness of the box',
      type: 'number',
    },
    color: {
      name: 'Color',
      defaultValue: '#0090E3',
      description: 'Color of the box',
      color: {
        control: { type: 'color', presetColors: [{ title: 'Coolblue', color: '#0090E3' }] },
      },
    },
    opacity: {
      name: 'Opacity',
      defaultValue: 1,
      description: 'Opacity of the box',
      type: 'number',
      control: {
        type: 'range',
        min: 0,
        max: 1,
        step: 0.05,
      },
    },
    open: {
      name: 'Open',
      defaultValue: false,
      description: 'Opens the box.',
      type: 'boolean',
    },
    rotate: {
      name: 'Rotate',
      defaultValue: false,
      description: 'Rotates the box. Used to debug.',
      type: 'boolean',
    },
  },
} as ComponentMeta<typeof Box>;

const defaultProps: ComponentProps<typeof Box> = {
  open: false,
  rotate: false,
};

const Template: ComponentStory<typeof Box> = (args) => (
  <div
    style={{
      perspective: '750px',
      perspectiveOrigin: '50% calc(50% - 200px)',
    }}
  >
    <Box {...defaultProps} {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.storyName = 'Default';
