// metro.config.js
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const withStorybook = require('@storybook/react-native/metro/withStorybook');

const projectRoot = __dirname;

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add asset handling configuration
config.resolver.assetExts.push('png', 'jpg', 'jpeg', 'gif');
config.resolver.extraNodeModules = {
  '@': path.resolve(projectRoot),
};

config.transformer.minifierConfig = {
  compress: {
    // The option below removes all console logs statements in production.
    drop_console: true,
  },
};

module.exports = withStorybook(config, {
  enabled: true,
  configPath: path.resolve(projectRoot, './.storybook'),
});
