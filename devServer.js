const WebpackDevServer = require('webpack-dev-server'),
  webpack = require('webpack'),
  webpackConfig = require('./webpack.config'),
  config = require('./devServer.config');

const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(compiler, {
  contentBase: 'src',
  historyApiFallback: true,
  hot: true,
  proxy: {
    '/api': {
      target: config.apiUrl,
      changeOrigin: true,
      pathRewrite: {'^/api' : '/'}
    },
  },
});

server.listen(config.port, config.host, () => {
  console.log(`Listening on ${config.host} port ${config.port}.`);
});
