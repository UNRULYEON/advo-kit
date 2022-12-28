import { ComponentProps, useRef } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Rectangle from '.';
import { useAnimationFrame } from 'framer-motion';

export default {
  title: 'Rectangle',
  component: Rectangle,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof Rectangle>;

const defaultProps: ComponentProps<typeof Rectangle> = {
  height: 200,
  width: 200,
  depth: 200,
  notAbsolute: true,
};

const Template: ComponentStory<typeof Rectangle> = (args) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useAnimationFrame((t) => {
    const rotate = Math.sin(t / 10000) * 200;
    if (ref.current) {
      ref.current.style.transform = `rotateX(${rotate}deg) rotateY(${rotate}deg)`;
    }
  });

  return (
    <div
      style={{
        perspective: '800px',
      }}
    >
      <Rectangle ref={ref} {...defaultProps} {...args} />
    </div>
  );
};

export const Primary = Template.bind({});
Primary.storyName = 'Default';
