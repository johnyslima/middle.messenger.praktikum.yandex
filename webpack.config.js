const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "messenger.bundle.js",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".js", ".json", ".hbs", ".pcss", ".html"],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.hbs/,
        use: [
          {
            loader: "handlebars-template-loader",
            options: {
              runtime: path.resolve(__dirname, "src/Helpers"),
            },
          },
        ],
      },
      {
        test: /\.?css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-nested",
                    "postcss-simple-vars",
                    "postcss-icon-blender",
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.svg/,
        use: {
          loader: "svg-url-loader",
          options: {
            // make all svg images to work in IE
            iesafe: true,
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
    }),
  ],
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
};
