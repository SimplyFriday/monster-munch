# Monster Munch (Working Title)
Game made for Callum Upton's first [game jam](https://itch.io/jam/callum-uptons-game-jam). It is made using [Excalibur](https://excaliburjs.com/).

# License
Images and audio are composed of licenced content from https://www.gamedevmarket.net/, and are included only so that the project can be built and run by anybody. These files cannot be used in any comercial product if downloaded from the repository.

All code is licensed under the [Business Source License 1.1](https://mariadb.com/bsl11/). In short, that means you can build a copy for yourself and/or use it for internal business purposes (whatever that means for game code ¯\\_(ツ)_/¯) but you can't use any particular version of the code in a comercial product until 3 years after the initial publication date for that version.

## Get Started

* Using [Node.js](https://nodejs.org/en/) 14 (LTS) and [npm](https://www.npmjs.com/)
* Run the `npm install` to install dependencies
* Run the `npm start` to run the development server to test out changes
   * [Webpack](https://webpack.js.org/) will build the [Typescript](https://www.typescriptlang.org/) into Javascript
   * [Webpack dev server](https://webpack.js.org/configuration/dev-server/) will host the script in a little server on http://localhost:8080/

## Publishing

* Run `npm run build:dev` to produce Javascript bundles for debugging in the `dist/` folder
* Run `npm run build:prod` to produce Javascript bundles for production (minified) in the `dist/` folder

## Contributors
* Josh Greenlaw - Primary coding
* Ray Coulter - Level design
* Redd (R2-VE#8282) - BONK Sound Effect
