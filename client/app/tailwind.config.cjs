/** @type {import('tailwindcss').Config} */
import defaultConfig from 'tailwindcss/stubs/config.full.js'

module.exports = {
    presets: [defaultConfig],
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: { extend: {} },
    plugins: [],
  };
  