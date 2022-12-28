import { ComponentProps } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Menu from '.';

export default {
  title: 'Menu',
  component: Menu,
} as ComponentMeta<typeof Menu>;

const defaultProps: ComponentProps<typeof Menu> = {};

const AlignBottom = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col justify-end" style={{ height: 'calc(100vh - 32px)' }}>
    {children}
  </div>
);

const Template: ComponentStory<typeof Menu> = (args) => (
  <AlignBottom>
    <Menu {...defaultProps} {...args} />
  </AlignBottom>
);

export const Primary = Template.bind({});
Primary.storyName = 'Default';
