// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add asset handling configuration
config.resolver.assetExts.push('png', 'jpg', 'jpeg', 'gif');

config.transformer.minifierConfig = {
  compress: {
    // The option below removes all console logs statements in production.
    drop_console: true,
  },
};

module.exports = config;
