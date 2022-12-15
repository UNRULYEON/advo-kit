import "./preview.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'Gray blue',
    values: [
      {
        name: 'Gray blue',
        value: '#F2F7FC'
      },
      {
        name: 'Light',
        value: '#F8F8F8'
      },
      {
        name: 'Dark',
        value: '#333333'
      }
    ]
  }
}