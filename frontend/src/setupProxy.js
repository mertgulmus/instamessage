/**
 * This file sets up the proxy middleware for the frontend.
 * It uses the `http-proxy-middleware` package to create the proxy middleware.
 */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
};
