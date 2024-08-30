/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/*.{html,js}",
        "./src/**/*.{html,js}",
        "./src/**/*.vue",
        "./public/*.html",
        "./node_modules/tw-elements/js/*.js",
    ],
    theme: {
        extend: {},
    },
    plugins: [require("tw-elements/plugin.cjs")],
};
