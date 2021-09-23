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
      target: 'http://3.35.168.232:8080',
      changeOrigin: true,
    })
  );
};
```


> 완료한 작업
1. 회원가입 / 로그인 / 로그아웃
2. 게시물 CRUD
3. Detail Page

> 해야할 작업 (필수)
1. 파일 업로드 기능 추가 
2. 페이징 작업 (페이지 나누기 or 무한 스크롤)
3. 좋아요(Like) 기능 추가
4. 디테일한 Styling 작업

> 하면 좋은 작업 (선택)
1. 소셜 로그인 기능