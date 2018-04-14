const dotenv = require('dotenv')

/**
 * "poi-plugin-dotenv" options.
 * @typedef {Object} PoiPluginDotenvOptions
 * @property {string} [path] Change ".env" default path.
 * @property {Object.<string, string>} [env] Object which overwrite defined variables.
 */

/**
 * Loads env into Poi application.
 * @param {PoiPluginDotenvOptions} options
 * @returns {function(Poi):void}
 */
function plugin (options = {}) {
  dotenv.config({
    path: options.path
  });

  const env = Object.assign({}, process.env, options.env || {});

  return (poi) => {
    poi.env = env;
  };
};

module.exports = plugin;
