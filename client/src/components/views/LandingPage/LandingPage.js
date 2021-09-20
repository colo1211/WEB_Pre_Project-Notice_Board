import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../../_actions/user_action';
import { withRouter } from 'react-router';
import { Button } from 'react-bootstrap'; 
import './LandingPage.scss';

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


    const onSubmitHandler = (e) => {
        e.preventDefault(); 
        console.log('제출')
    }

    return (
        <div>
            <p>반갑습니다! {user.user.name}님! </p>
            <form className='form-layout' >
                <div className = 'form-wrap'>
                    <p>제목</p>
                    <input className= 'input-layout'></input>
                    <p>내용</p>
                    <input className= 'input-layout'></input>
                    <p>장소</p>
                    <input className= 'input-layout'></input>
                    <p>학교ID</p>
                    <input className= 'input-layout'></input>
                    <p>급여</p>
                    <input className= 'input-layout'></input>
                    <p>소요시간</p>
                    <input className= 'input-layout'></input>
                    <p>연락처</p>
                    <input className= 'input-layout' placeholder='010-1234-5678'></input>
                    <p>카테고리</p>
                    <input className='input-layout' placeholder='SURVEY or EXPERIMENT'></input>
                    <p>마감날짜</p>
                    <input type ='date' className= 'input-layout'></input>
                    <p>실험/설문날짜</p>
                    <input className= 'input-layout' placeholder='2021-08-10T09:30'></input>
                    <Button onSubmit={onSubmitHandler} className = 'mt-5' variant="primary">제출</Button>
                </div>
               
            </form>
        </div>
    )
}

export default withRouter(LandingPage);