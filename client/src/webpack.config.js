
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CompressionPlugin = require("compression-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack')
module.exports = {
  entry: {
    javascript: "./app/js/app.jsx",
    html: "./app/index.html",
    html2: "./app/google326544d7d6c7e469.html"

  },
  devServer: {
    port: 3000,
    historyApiFallback: {
      index: '/'
    }
  },
  output: {
    path: __dirname + "/../dist",
    filename: "/js/app.js",
    publicPath: "/"
  },
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]"
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["react-hot", 'babel?' + JSON.stringify(
          {
            presets: ['react', 'es2015'],
            "plugins": [
              "syntax-class-properties",
              "syntax-decorators",
              "syntax-object-rest-spread",

              "transform-class-properties",
              "transform-object-rest-spread"
            ]
          }
        )]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      { test: /\.gif$/, loader: "url-loader?mimetype=image/png" },
      { test: /\.png$/, loader: "url-loader?mimetype=image/png" },
      { test: /\.jpg$/, loader: "url-loader?mimetype=image/jpg" },
      { test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?name=[name].[ext]" },
    ]
  },
  plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            // This has effect on the react lib size
            'NODE_ENV': JSON.stringify('development'),
          }
        }),
        new ExtractTextPlugin("styles.css"),
        new CompressionPlugin({
           asset: "gzip/[path]",
           algorithm: "gzip",
           test: /\.js$|\.css$/,
       }),
        new webpack.DefinePlugin({GA_TRACKING_CODE: JSON.stringify('UA-3987274-10')}),
        new CopyWebpackPlugin([
          // relative path is from src
          { from: './app/favicon.ico' }, // <- your path to favicon
        ])

    ]
};
