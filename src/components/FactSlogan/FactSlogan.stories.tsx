import { ComponentProps } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import FactSlogan from '.';

export default {
  title: 'Fact slogan',
  component: FactSlogan,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof FactSlogan>;

const defaultProps: ComponentProps<typeof FactSlogan> = {
  fact: 'Advo-kit',
  slogan: 'Think outside the box',
};

const Template: ComponentStory<typeof FactSlogan> = (args) => <FactSlogan {...defaultProps} {...args} />;

export const Primary = Template.bind({});
Primary.storyName = 'Default';
