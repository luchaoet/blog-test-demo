const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const webpackConfig = {
  entry: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', path.resolve(__dirname, './src/index.js')],
  mode: 'development',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './index.html'),
      filename: 'index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}
const compiler = webpack(webpackConfig)
const express = require('express')
const app = express()

app.use(
  devMiddleware(compiler, {
    // webpack-dev-middleware options
    publicPath: webpackConfig.output.publicPath,
  })
)

app.use(
  hotMiddleware(compiler, {
    // webpack-hot-middleware options
    publicPath: webpackConfig.output.publicPath,
    log: false,
    heartbeat: 2000,
  })
)

app.listen(3000, () => console.log('Example app listening on port 3000!'))
