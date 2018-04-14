# poi-plugin-dotenv

Loads .env variables into Poi's application.

## Install

Install using NPM or Yarn.

```sh
npm install poi-plugin-dotenv --save-dev

# Or using Yarn
yarn add poi-plugin-dotenv --dev
```

## Usage

Create a `.env` file on your's project root and define environment variables.

```sh
API = "http://127.0.0.1:3001/"
ROLLBAR_KEY = "9EN10oiaso01290i9OIFD ..."
```

Create `poi.config.js` file on your's project root and call this module on plugins Array.

```js
module.exports = {
  plugins: [
    require('poi-plugin-dotenv')({ // Options like "path" and "env"
                                   // overwritten variables goes here.
    })
  ],
}
```

Now you can use variables through `process.env`.

```js
// ...
const getUsers = () => fetch(process.env.API + 'users')
```

## Options

- `path` - Change default `./.env` path.
  For example loading `./config/variables` file instead.
  ```js
  require('poi-plugin-dotenv')({
    path: './config/variables'
  })
  ```

- `env` - Overwrite loaded variables using an object.
  ```js
  require('poi-plugin-dotenv')({
    env: {
      'API': 'http://localhost:3002/v1/'
    }
  })
  ```

## License

Released under MIT license. You can see it [here][license].

<!-- Links -->

[license]: ./LICENSE
