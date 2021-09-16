import axios from 'axios'; 

export function loginAction(userInfo){
    const request = axios.post('/api/user/login', userInfo)
    .then((response)=>
        response.data
    ); 

    return {
        type : 'LOGIN_ACTION', 
        payload : request
    }; 
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

export function logoutAction(userInfo){
    const request = axios.post('/api/user/logout',userInfo)
    .then((response) => 
        response.data
    );

    return {
        type : 'LOGOUT_ACTION', 
        payload : request
    }
}