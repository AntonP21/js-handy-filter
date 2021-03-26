const path = require('path');

module.exports = {
  mode: 'production',
  entry: './index.ts',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    alias: {
      conditions: path.resolve(__dirname, 'src/conditions/'),
      filter: path.resolve(__dirname, 'src/filter/'),
      lib: path.resolve(__dirname, 'src/lib/'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
  },

  watchOptions: {
    ignored: '/node_modules/',
  },
};
