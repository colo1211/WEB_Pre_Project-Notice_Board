import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {loginAction} from '../../../_actions/user_action';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import './SignIn.scss';

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
                localStorage.setItem('user', JSON.stringify({accessToken:`${response.payload.accessToken}`,email:`${Email}`, password: `${Password}`})); 
                history.push('/');
            }
        }).catch(()=>{
            alert('다시 확인 ㄱ');
        })
    }


    return (
        <div style = {{
            display: 'flex' , justifyContent : 'center', alignItems:'center', 
            width : '100%', height : '100vh'
        }}>
                <form style={{ display:'flex', flexDirection:'column'}} onSubmit={onSubmitHandler}>
                    <label>Email</label>
                    <input className='input-style' name= 'email' type = 'email' placeholder='Email@exmaple.com' value={Email} onChange={onChangeHandler}/>
                    <label style={{marginTop : '5px'}}>Password</label>
                    <input className='input-style' name= 'password' type = 'password' placeholder = 'Password' value={Password} onChange={onChangeHandler}/>
                    <button className='btn btn-primary input-style' style={{marginTop : '15px'}}>Sign In</button>
                    <Link style={{marginTop : '15px'}} to='/signup'>Sign Up</Link>
                </form>
        </div>
    )
}

export default withRouter(SignIn);
