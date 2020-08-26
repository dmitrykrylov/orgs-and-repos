const { colors } = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {},
    colors: {
      ...colors,
      primary: colors.teal,
    },
  },
  purge: ["./src/**/*.tsx"],
};
