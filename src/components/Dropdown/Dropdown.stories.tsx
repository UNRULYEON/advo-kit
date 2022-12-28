import { ComponentProps, useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Dropdown, { Item } from '.';

export default {
  title: 'Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const defaultProps: ComponentProps<typeof Dropdown> = {
  label: 'Choose your kit',
  currentItem: { id: 'stakeholder-meeting', name: 'Stakeholder meeting' },
  items: [
    { id: 'stakeholder-meeting', name: 'Stakeholder meeting' },
    { id: 'design-pitch', name: 'Design pitch' },
    { id: 'developer-kick-off', name: 'Developer kick-off' },
    { id: 'soon', name: 'Soon...', disabled: true },
  ],
  handleOnClick: () => {},
};

const Template: ComponentStory<typeof Dropdown> = (args) => {
  const [currentItem, setCurrentItem] = useState(defaultProps.currentItem);

  const handleOnClick = (item: Item) => setCurrentItem(item);

  return <Dropdown {...defaultProps} {...args} currentItem={currentItem} handleOnClick={handleOnClick} />;
};

export const Primary = Template.bind({});
Primary.storyName = 'Default';
