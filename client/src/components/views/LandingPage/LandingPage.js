import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios'; 


const LandingPage = () => {
    useEffect(()=>{
        if(localStorage.getItem('accessToken') !== null){
           axios.post('api/user/login', localStorage.getItem('accessToken'))
        .then(() => 
            console.log('아직 유저정보 살아있음')
        );
      }    
    },[]);

    return (
        <div>
            Landing Page
            <p>반갑습니다!</p>
        </div>
    )
}

export default LandingPage;