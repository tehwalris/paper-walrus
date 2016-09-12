const WebpackDevServer = require('webpack-dev-server'),
  webpack = require('webpack'),
  path = require('path'),
  webpackConfig = require('./webpack.config'),
  config = require('./devServer.config');

const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(compiler, {
  contentBase: 'src',
  historyApiFallback: {
    rewrites: [
      {from: /\.hot-update\.(json|js)$/, to: context => '/' + path.basename(context.parsedUrl.pathname)},
      {from: /./, to: 'index.html'},
    ],
    verbose: true,
  },
  hot: true,
  proxy: {
    '/graphql': {
      target: config.apiUrl,
      changeOrigin: true,
    },
  },
});

server.listen(config.port, config.host, () => {
  console.log(`Listening on ${config.host} port ${config.port}.`);
});
