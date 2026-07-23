import * as tailwindPlugin from "prettier-plugin-tailwindcss";

/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  trailingComma: "es5",
  // plugins: ["prettier-plugin-tailwindcss"],
  plugins: [tailwindPlugin],
};

export default config;
