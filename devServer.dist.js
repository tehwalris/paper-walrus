const express = require('express'),
  httpProxy = require('http-proxy'),
  fallback = require('express-history-api-fallback'),
  config = require('./devServer.config');

const app = express();
const apiProxy = httpProxy.createProxyServer();

app.use('/api', function(req, res) {
  apiProxy.web(req, res, {
    target: config.apiUrl,
    changeOrigin: true,
    pathRewrite: {'^/api': '/'},
  });
});

const webroot = __dirname + '/dist';
app.use('/', express.static(webroot));
app.use(fallback('index.html', {root: webroot}));

app.listen(config.port, config.host, () => {
  console.log(`Listening on ${config.host} port ${config.port}.`);
});
