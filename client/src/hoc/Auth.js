import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';


export default function (SpecificComponent, option) {

    const isLogin = useSelector((state)=> state.user.isLogin);
    const name = useSelector((state)=> state.user.name);
  
    function AuthCheck(props){
        useEffect(()=>{
            // Redux에 있는 isLogin과 option을 비교
            // true : 로그인한 유저만 출입이 가능한 페이지
            // false : 로그인한 유저 출입 불가 페이지
            
            // 로그인 했을 때 : Landing Page만 접속 가능
            if (isLogin === true && name !== 'Error'){
                // 로그인한 곳으로 접속하려 하면 라우팅 다른곳으로
                if (option === false){
                    props.history.push('/'); 
                }
            }
            // 로그인 안했을 때 : SignIn, SignUp만 접속 가능 
            else {
                if (option === true){
                    props.history.push('/signin'); 
                }
            }
        }, []);
        return <SpecificComponent />
    }
    return AuthCheck;
}

