import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {loginAction} from '../../../_actions/user_action';

const SignIn = () => {

    const history = useHistory();
    const dispatch = useDispatch(); 
    const [Email, setEmail] = useState(''); 
    const [Password, setPassword] = useState(''); 

    useEffect(()=>{
        setEmail(''); 
        setPassword('');         
    }, []); 


    const onChangeHandler = (e) => {
        
        if (e.target.name === 'email'){
            setEmail(e.target.value); 

        }else if (e.target.name === 'password'){
            setPassword(e.target.value);
        }

    }

    const onSubmitHandler = (e) => {
        e.preventDefault(); 

        let userInfo = {
            email : Email, 
            password : Password
        }

        // 로그인이니까 post
        dispatch(loginAction(userInfo))
        .then((response)=>{
            if (response){
                console.log(response); 
                let accessToken = response.payload.accessToken;
                localStorage.setItem('accessToken', accessToken); 
                history.push('/');
            }
        }).catch(()=>{
            alert('이메일과 비밀번호를 다시 입력하세요');
        })
    }


    return (
        <div style = {{
            display: 'flex' , justifyContent : 'center', alignItems:'center', 
            width : '100%', height : '100vh'
        }}>
            <form style={{ display:'flex', flexDirection:'column'}} onSubmit={onSubmitHandler}>
                <label>이메일</label>
                <input name= 'email' type = 'email' value={Email} onChange={onChangeHandler}/>
                <label>패스워드</label>
                <input name= 'password' type = 'password' value={Password} onChange={onChangeHandler}/>
                <button style={{marginTop : '15px'}}>Sign In</button>
            </form>
                
        </div>
    )
}

export default SignIn;
