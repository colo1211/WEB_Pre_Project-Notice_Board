import axios from 'axios'; 

export function loginAction(userInfo){
    const request = axios.post('/api/user/login', userInfo)
    .then((response)=>
        // 성공시 토큰이 response 에 담긴다. 
        // Token 을 헤더에 포함시켜서 유저정보를 요청
        response.data     
    )

    return {
        type : 'LOGIN_ACTION', 
        payload : request
    }
}

export function registerAction(userInfo){
    const request = axios.post('/api/user/signup', userInfo)
    .then((response)=>
        response.data
    ); 

    return {
        type : 'REGISTER_ACTION', 
        payload : request
    }
}

export function logoutAction(){

    const request = axios.post('/api/user/logout', null , {
        headers: {
            Authorization : 'Bearer ' +  localStorage.getItem('accessToken')
        }
    })

    return {
        type : 'LOGOUT_ACTION', 
        payload : request
    }
}