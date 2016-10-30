var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  // Entrypoints our application 
  entry: {
    // the standard polyfills we require to run Angular applications in most modern browsers.
    'polyfills': './src/polyfills.ts',
    //the vendor files we need: Angular, bootstrap.css...
    'vendor': './src/vendor.ts',
    //app - our application code.
    'app': './src/main.ts'
  },

  // Options affecting the resolving of modules.
  resolve: {
    extensions: [
      // an explicit extension (signified by the empty extension string, '') import "myJsFile"
      '',
      //.js extension (for regular JavaScript files and pre-compiled TypeScript files) or .ts extension
      '.js',
      '.ts'
    ]
  },

  htmlLoader: {
    minimize: false // workaround for ng2
  },

  // defines module loaders for resolving imports / requires
  module: {
    loaders: [
      {
        // awesome-typescript-loader - a loader to transpile our Typescript code to ES5, guided by the tsconfig.json file
        // angular2-template-loader - loads angular components' template and styles
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        // images/fonts - Images and fonts are bundled as well.
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      // css - The pattern matches application-wide styles; 
      // the second handles component-scoped styles (the ones specified in a component's styleUrls metadata property)
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      },
      {
        test: /\.(css)$/,
        include: helpers.root('src', 'app'),
        loader: 'raw'
      }
    ]
  },

  plugins: [
    // We want the app.js bundle to contain only app code and the vendor.js bundle to contain only the vendor code. 
    // Our application code imports vendor code. Webpack is not smart enough to keep the vendor code out of the app.js bundle. 
    // We rely on the CommonsChunkPlugin to do that job. 
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    // Webpack generates a number of js and css files. We could insert them into our index.html manually. That would be tedious and error-prone. 
    // Webpack can inject those scripts and links for us with the HtmlWebpackPlugin
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],

  output: {
    path: helpers.root('dist'), //local output folder
    publicPath: '/', // web server folder path
    filename: '[name].js', // => polyfills.js, vendor.js and app.js       
    chunkFilename: '[name]_[id].chunk.js'
  },

  //informationen for webpack server
  devServer: {
    contentBase: "./src",
  },

  //generate source-maps for debugging in browser
  devtool: 'source-map',
  debug: true,
};