const express = require('express'),
  httpProxy = require('http-proxy'),
  config = require('./devServer.config');

const app = express();
const apiProxy = httpProxy.createProxyServer();

app.use('/', express.static('./dist'));

app.use('/api', function(req, res) {
  apiProxy.web(req, res, {
    target: config.apiUrl,
    changeOrigin: true,
    pathRewrite: {'^/api': '/'},
  });
});

app.listen(config.port, config.host, () => {
  console.log(`Listening on ${config.host} port ${config.port}.`);
});
