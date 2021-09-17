### Back-End API Document </br>
* http://3.35.168.232:8080/docs/index.html
* Host : localhost:8080

* Front Port Num : 3000
* Back Port Num : 8080
</br>
</br>
> Cors 문제를 해결하기 위한 Proxy 설정 </br>

1. http-proxy-middleware 설치 
```
npm install http-proxy-middleware --save
```

2. `setupProxy.js`
```
const  createProxyMiddleware  = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
};
```