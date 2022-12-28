[&larr; Back](../README.md)

# Storybooks

## Running Storybooks

1. Make sure you've followed [Getting started](../README.md#getting-started)
2. Run `yarn storybooks` to run Storybooks

## Create a new Storybook

Components have their own folder in `src/components` and are placed in `index.tsx`. To create a story for the component, create a file with the following format: `YOUR_COMPONENT.stories.tsx`.

If you're new to Storybooks, it's recommended to read the [documentation on how to write stories](https://storybook.js.org/docs/react/writing-stories/introduction). You can use the following snippet to start your story and replace `YOUR_COMPONENT` with your components name.

```tsx
import { ComponentProps } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import YOUR_COMPONENT from '.';

export default {
  title: 'YOUR_COMPONENT',
  component: YOUR_COMPONENT,
} as ComponentMeta<typeof YOUR_COMPONENT>;

const defaultProps: ComponentProps<typeof YOUR_COMPONENT> = {};

const Template: ComponentStory<typeof YOUR_COMPONENT> = (args) => <YOUR_COMPONENT {...defaultProps} {...args} />;

export const Primary = Template.bind({});
Primary.storyName = 'Default';
```
