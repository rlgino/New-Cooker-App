/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
        colors: {
            primary: '#0C9A61',
            secondary: '#9C9C9C',
            danger: '#eb445a'
        }
    },
    plugins: [],
}