const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

//For our Babel plugin to know that we are running in developnemt mode.
process.env.NODE_ENV = "development";

//Object that configures webpack.
module.exports = {
  mode: "development", //For the webpack to know to run in developnemt mode.
  target: "web",
  devtool: "cheap-module-source-map", //For getting a source map for debugging.
  entry: "./src/index", //Our entry point.
  //Webpack doesn't output code in development mode. It server our app from memory.
  //We do have to declare next paths so that i knows where it's serving from memory.
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js",
  },
  devServer: {
    stats: "minimal",
    overlay: true,
    historyApiFallback: true, // All request will be sent to index.html.
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify("http://localhost:3001"),
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico",
    }),
  ],

  //Tells webpack what files we want it to handle.
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, //Tells to look either JS files or JSX files.
        exclude: /node_modules/,
        //babel-loader - will run Babel on all of our JS, and Webpack will bundle that up for us.
        //Now webpack will watch our files, recompile our code and run eslint  when we hit save.
        //Runs ESLint first, then Babel.
        use: ["babel-loader", "eslint-loader"],
      },
      {
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"], //This combination will allow us to import CSS and webpack bundle all of our CSS into single file
      },
    ],
  },
};
