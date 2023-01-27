const { mergeConfig } = require('vite');
const path = require('path');
const alias = require('@rollup/plugin-alias');

module.exports = {
  stories: ['../src/components/**/*.stories.mdx', '../src/components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    storyStoreV7: true,
  },
  async viteFinal(config, { configType }) {
    // return the customized config
    return mergeConfig(config, {
      // customize the Vite config here
      plugins: [
        alias({
          entries: {
            '@components': path.resolve(__dirname, '../src/components'),
            '@hooks': path.resolve(__dirname, '../src/hooks'),
            '@icons': path.resolve(__dirname, '../src/icons'),
            '@utils': path.resolve(__dirname, '../src/utils'),
            '@kits': path.resolve(__dirname, '../src/kits.ts'),
          },
        }),
      ],
    });
  },
};
