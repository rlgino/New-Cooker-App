# New Cookers

## Overview
This is a simple application for demostrating knowledge in Ionic and React. Here I'm using Firebase as storage.

## Screenshots

TBD

### How to use?
You can download the application from this [apk-debug.apk](https://drive.google.com/file/d/1dQ6xFWLtEf6_MkedooZrbK9j9fxqDUkO/view?usp=drive_link)

### Running locally
Meanwhile you can download the code and run `ionic run build` and pasting your firebase keys in `src/app/firebase.ts`.

### Structure
TBD
Firebase <-------------------------New Cooker App 
^-- Go Back (sort receipts by ingredients) --^

## Technologies

* Ionic + Capacitor
* React
* Typescript
* Firebase
* Tailwind

## Know how

### Installing Tailwind
1. Install dependencies
```bash
npm install -D tailwindcss postcss autoprefixer
```
2. Init tailwind
```bash
npx tailwindcss init -p
```
3. Create a tailwind.config.js file in root
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
4. Add a file `src/theme/tailwind.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
5. Add it to App.tsx (or your entry point)
```ts
import './theme/tailwind.css';
```

### Add git secret for encrypt data
I used [Git Secret](https://sobolevn.me/git-secret/installation) tool for encrypt credentials.

### Do you wish to contribute?
TBD

## License
TBD

## Contact me

* Email: gino.luraschi@gmail.com

## Status
First version uploaded with minimal functionallity.

## Coming...
* Change in styling (https://dribbble.com/shots/20792040-Cookpedia-Food-Recipe-Mobile-App)
