
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: {
    javascript: "./app/js/app.jsx",
    html: "./app/index.html"
  },
  output: {
    path: __dirname + "/../dist",
    filename: "/js/app.js"
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
      { test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?name=[name].[ext]" },
    ]
  },
  plugins: [
        new ExtractTextPlugin("styles.css")
    ]
};
