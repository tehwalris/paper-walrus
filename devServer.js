const WebpackDevServer = require('webpack-dev-server'),
  webpack = require('webpack'),
  config = require('./webpack.config');

const host = '0.0.0.0';
const port = 8081;

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
  contentBase: 'src',
  hot: true,
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      pathRewrite: {
        '^/api' : '/'
      }
    },
  },
});

server.listen(port, host, () => {
  console.log(`Listening on ${host} port ${port}.`);
});
