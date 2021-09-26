## Notice_Board 프로젝트 

### 진행기간
: 2021-09-15 ~ 2021-09-26 (약 12일)
### 목적
: 10월부터 첫 프로젝트를 진행하기 위해서 API 문서를 통해 Axios 라이브러리를 활용하여 Back-End와의 request / response를 통해 Front-End 개발자로서의 전반적인 흐름을 이해하기 위해서 Pre-Project를 진행.

### 얻은 점
1. 해당 프로젝트를 통해 accessToken을 활용한 Auth(로그인 , 회원가입 , 로그아웃)을 이해 및 구현하였으며, 서버로 부터 받은 accessToken을 LocalStorage에 저장함으로써, 
새로고침 하더라도 로그인 상태를 유지하는 방법 터득


2. 게시물을 생성/읽기/수정/삭제 (CRUD) 하는 방법에 대해서 터득하였으며, Back-End로의 reqeust를 통해 얻은 response를 통해 처리하는 비동기적인 감각을 기를 수 있었음. 


3. 서버로 부터 얻은 response를 통해 Front-End 측에서 Data-Binding 을 하는 방법에 대해 정확히 알 수 있었다. 

### 배워야 할 점
1. Front-End 개발자로써, 전문적인 수준까지는 아닐지라도 대략적인 Design 을 진행 할 수 있는 Product Design Tool ( Figma ) 을 익혀야 한다는 필요성을 느꼈다.


2. 여러 개발자들과 협업을 하기 위해서 Git의 협업 기능에 대해서 익힐 필요성을 느꼈다. 


3. FE 개발자는 API 문서를 통해서 req/res를 잘 받아내어 화면에 뿌려주는 능력이 중요한 것 같다. 조금 더 다양한 서비스를 개발하기 위해서 외부 API를 받아오는 방법에 대해서 학습해야겠다는 필요성을 느꼈다. 


4. React를 통해 코딩할 때 대부분의 개발자들이 Styled-Component를 사용하는 것을 알게 되었다. 
CSS 를 정확히 숙지할 기회를 한번 더 가지고 이후, Styled-Component를 학습해야겠다는 필요성을 느꼈다. 
   


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
4. 좋아요(Like) 기능 추가
5. 파일 업로드 (CRUD) 추가 및 파일 업로드시 미리보기 기능 ( FileReader API )
6. 페이징 작업 (Pagination, 라이브러리 사용 X)

> 해야할 작업 (필수)

-끝-

---

### 구현 이미지

> SignIn (로그인 페이지, 처음 입장하였을때)

![image](https://user-images.githubusercontent.com/63600953/134805303-ccb195fe-8824-49b8-aaf5-8367807d9b40.png)

* 아이디만 입력했을 때
  
![image](https://user-images.githubusercontent.com/63600953/134805403-38f4d395-c027-45c6-a0bd-acb446150e49.png)

* 비밀번호만 입력했을 때
  
![image](https://user-images.githubusercontent.com/63600953/134805417-d4c43813-0364-4add-b66e-57be56cb6fd5.png)

* 아이디와 비밀번호가 일치하지 않을 때

![image](https://user-images.githubusercontent.com/63600953/134805446-8cabdb39-d0be-4d80-ab21-1b93a7604e1d.png)

> SignUp (회원가입 페이지, 로그인 페이지에서 SignUp을 클릭하였을 때)
  
![image](https://user-images.githubusercontent.com/63600953/134805344-9ce69c89-23d5-429d-8282-c5fb6ae2244e.png)

> LadingPage ( SignUp / SignIn을 통과했을 때 )

* NavBar
  1. `Notice Borad` 로고 클릭시 LandingPage로 이동이 가능하도록 라우팅 하였음
    2.  로그인시, User의 이름을 알 수 있도록 NavBar에 띄움
  3. Create Notice 버튼을 클릭시 게시물을 생성할 수 있는 페이지로 이동
    4. Sign Out을 클릭하면 로그아웃
    

* 조회(Read) 조건
1. 학교명
2. 실험 마감 날짜(do_date) 
    
![image](https://user-images.githubusercontent.com/63600953/134805650-c8e09ab4-140c-4556-93ba-ae89f7d2fd2c.png)
</br></br>

> 읽기(조회, Read) 페이지

* 학교명과 실험 마감 날짜를 입력하면 그에 해당하는 글이 리스트로 뜨게 된다. 
* 원래는 총 5개의 글이지만 페이지 하나에 2개의 글이 들어가도록 설정하여 총 3개의 페이지가 나온다.


![image](https://user-images.githubusercontent.com/63600953/134805872-2361dd58-8f99-4a20-b33e-58e67a4d3d55.png)

> Detail Read ( 세부 글 조회 ) 페이지
* Like 버튼을 클릭하면 🤍 가 ❤로 변환된다. 
* 해당 글에 대한 삭제를 진행 할 수 있는 삭제 기능을 구현하였다. 
* 해당 글에 대한 수정을 진행 할 수 있는 수정 버튼을 통해 구현하였다. 

![image](https://user-images.githubusercontent.com/63600953/134806802-0e3b83fd-ae06-4ee8-919e-fbcc752ee7bc.png)

> 수정 (Update) 페이지
* 기존에 User가 입력했던 정보들을 그대로 띄우고 수정할 수 있도록 Modal 창 형태로 구현하였다.

![localhost_3000_detail_30](https://user-images.githubusercontent.com/63600953/134806978-835b149f-4c6c-4bef-acab-294ca6df8cc2.png)

> 삭제 (Delete) 페이지

![image](https://user-images.githubusercontent.com/63600953/134806899-84a4e546-b610-46cc-9e2f-53c7695fd765.png)


> 생성(글쓰기, Create) 페이지

* 백엔드에서 제공하는 API에 맞게 생성 Form을 제작하였다. 
* POST 요청시 Form Data로 전송해야 제대로 글생성이 된다. 
* FileReader API를 활용하여 이미지의 Fake Path 를 URL로 변환한 이후, Attachment state를 이용하여 미리보기를 구현하였음.

![localhost_3000_create (2)](https://user-images.githubusercontent.com/63600953/134806024-6410cd3e-1b0c-4b31-91a4-b64baa29a85f.png)



