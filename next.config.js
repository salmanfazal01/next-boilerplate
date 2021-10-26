const withPlugins = require("next-compose-plugins");
const { i18n } = require("./next-i18next.config");
const nextImages = require("next-images");

module.exports = withPlugins([nextImages], { i18n });
