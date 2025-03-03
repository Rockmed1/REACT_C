# start by creating the project

npm create vite@<version: 4 or latest>

# In The Project Folder:

## run the initial/default node installs

npm install

## install eslint

npm i eslint vite-plugin-eslint eslint-config-react-app --save-dev

### make sure you have eslint installed in VSCode

## create a new file:

.eslintrc.json

### populate the file:

{
"extends": "react-app"
}

## add this to the vite.config.js

```
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
```

## delete the .css files and the asset folder. remove the import to .css from the main.jsx. remove App.jsx contents to start fresh

## start the server

```
npm run dev
```
