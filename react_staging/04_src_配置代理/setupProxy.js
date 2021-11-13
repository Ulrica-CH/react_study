const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    proxy('/api1', {
      //遇见/api1前缀的请求，就会触发该代理配置
	  //请求转发给谁
      target: 'http://localhost:5000', 
	  //控制服务器收到的请求头中Host的值 进行伪装
      changeOrigin: true, 
	  //重写请求路径(必须)
      pathRewrite: { '^/api1': '' }, 
    }),
    proxy('/api2', {
      target: 'http://localhost:5001',
      changeOrigin: true,
      pathRewrite: { '^/api2': '' },
    })
  );
};
