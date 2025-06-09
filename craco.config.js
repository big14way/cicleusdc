const path = require('path')

module.exports = {
  eslint: {
    enable: false, // Disable ESLint for build
  },
  webpack: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {
      // Add polyfills for Node.js modules
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        assert: require.resolve('assert'),
        buffer: require.resolve('buffer'),
        crypto: require.resolve('crypto-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
        process: require.resolve('process/browser'),
        stream: require.resolve('stream-browserify'),
        url: require.resolve('url'),
        util: require.resolve('util'),
        vm: require.resolve('vm-browserify'),
        zlib: require.resolve('browserify-zlib'),
      }

      // Add plugins to define global variables
      webpackConfig.plugins = [
        ...webpackConfig.plugins,
        new (require('webpack').ProvidePlugin)({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer'],
        }),
      ]

      return webpackConfig
    },
  },
}
