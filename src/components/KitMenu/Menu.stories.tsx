import { ComponentProps } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import KitMenu from '.';

export default {
  title: 'Menu',
  component: KitMenu,
} as ComponentMeta<typeof KitMenu>;

const defaultProps: ComponentProps<typeof KitMenu> = {};

const AlignBottom = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col justify-end" style={{ height: 'calc(100vh - 32px)' }}>
    {children}
  </div>
);

const Template: ComponentStory<typeof KitMenu> = (args) => (
  <AlignBottom>
    <KitMenu {...defaultProps} {...args} />
  </AlignBottom>
);

export const Primary = Template.bind({});
Primary.storyName = 'Default';
