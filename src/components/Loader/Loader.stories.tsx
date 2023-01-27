import { ComponentProps } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Loader from '.';

export default {
  title: 'Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof Loader>;

const defaultProps: ComponentProps<typeof Loader> = {};

const Template: ComponentStory<typeof Loader> = (args) => <Loader {...defaultProps} {...args} />;

export const Default = Template.bind({});
Default.storyName = 'Default';
