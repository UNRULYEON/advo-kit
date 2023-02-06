import { ComponentProps } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Card from '.';

export default {
  title: 'Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof Card>;

const defaultProps: ComponentProps<typeof Card> = {
  question: 'Does this meet all functional requirements?',
  first: false,
};

const Template: ComponentStory<typeof Card> = (args) => <Card {...defaultProps} {...args} />;

export const Primary = Template.bind({});
Primary.storyName = 'Default';
