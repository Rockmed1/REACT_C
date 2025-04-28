# make sure you're in the right folder

## start npm

npm init

## download parcel as a dev only dependency

npm i parcel -D

## modify the package.json

"scripts": {
"start": "parcel index.html",
"build": "parcel build index.html"
},

## run scripts- this will run the local host server as well

npm run start
or
npm start

## backwards compatibility: remember to import them in the js file as well

npm i core-js regenerator-runtime

## hot module to preserve state

if (module.hot) module.hot.accept();
