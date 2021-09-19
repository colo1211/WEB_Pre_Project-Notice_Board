import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'; 
import { loginAction } from '../../../_actions/user_action';
import { withRouter } from 'react-router';

const LandingPage = () => {

    const user = useSelector((state) => state); 
    const dispatch = useDispatch(); 

    // 로그인 후 새로고침 할때, 유저의 로그인 기록을 유지
    useEffect(()=>{
        if(localStorage.getItem('user') !== null){
            // LocalStorage에 저장한 정보를 가져와서 다시 로그인 시키는 Logic
            let email = JSON.parse(localStorage.getItem('user')).email;
            let password = JSON.parse(localStorage.getItem('user')).password;
            let user = {
                email : email, 
                password : password
            }
            // Redux 에 저장
            dispatch(loginAction(user))
            .then(() => 
            console.log('유저정보 아직 살아있음')
        );
      }    
    },[]);

    return (
        <div>
            Landing Page
            <p>반갑습니다! {user.user.name}님! </p>
        </div>
    )
}

export default withRouter(LandingPage);