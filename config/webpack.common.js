const paths = require('./paths');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: `${paths.src}/index.tsx`,
  target: "web",  
  output: {
    path: paths.build,
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "awesome-typescript-loader",
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: 'style-loader', // inject CSS to page
          },
          // 'style-loader',
          { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
          { loader: 'postcss-loader', 
          options: { sourceMap: true }
        },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/, type: 'asset/resource' },
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' }
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${paths.public}/assets`,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
        },
        {
          from: `${paths.public}/_redirects`,
          to: '.',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
        }
      ],
    }),

    new HtmlWebpackPlugin({
      template: `${paths.public}/index.html`,
      title: 'Kigurumi me',
      favicon: `${paths.public}/assets/images/favicon.jpg`,
      filename: 'index.html',
    }),
  ],
};