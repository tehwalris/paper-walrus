const express = require('express'),
  httpProxy = require('http-proxy'),
  fallback = require('express-history-api-fallback'),
  config = require('./devServer.config');

const app = express();
const apiProxy = httpProxy.createProxyServer();

app.use('/graphql', function(req, res) {
  apiProxy.web(req, res, {
    target: config.apiUrl,
    changeOrigin: true,
  });
});

const webroot = __dirname + '/dist';
app.use('/', express.static(webroot))a
app.use(fallback('index.html', {root: webroot}));

app.listen(config.port, config.host, () => {
  console.log(`Listening on ${config.host} port ${config.port}.`);
});
