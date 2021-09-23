import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { registerAction } from '../../../_actions/user_action';
import { withRouter } from 'react-router';
import '../SignIn/SignIn.scss'; 
import { Link } from 'react-router-dom';

const SignUp = () => {

    const history = useHistory(); 
    const dispatch = useDispatch(); 
    const [Name, setName] = useState(''); 
    const [Email, setEmail] = useState(''); 
    const [Password, setPassword] = useState(''); 

    useEffect(()=>{
        setName(''); 
        setEmail(''); 
        setPassword('');         
    }, []); 


    const onChangeHandler = (e) => {
        if (e.target.name === 'name'){
            setName(e.target.value); 

        }else if (e.target.name === 'email'){
            setEmail(e.target.value); 

        }else if (e.target.name === 'password'){
            setPassword(e.target.value);
        }
    }

    const onSubmitHandler = (e) => {
        e.preventDefault(); 

        let userInfo = {
            name : Name, 
            email : Email, 
            password : Password
        };

        dispatch(registerAction(userInfo))
        .then((response)=>{
            if (response){
                history.push('/login'); 
                alert('가입을 축하합니다. 로그인을 진행하세요.'); 
            }
        })
    }

    return (
        <div style = {{
            display: 'flex' , justifyContent : 'center', alignItems:'center', 
            width : '100%', height : '100vh'
        }}>
            <form style={{ display:'flex', flexDirection:'column'}} onSubmit={onSubmitHandler}>
                <label>이름</label>
                <input className = 'input-style' name='name' type = 'text' placeholder = '손흥민' value={Name} onChange={onChangeHandler}/>
                <label style={{marginTop : '5px'}}>이메일</label>
                <input className = 'input-style' name='email' type = 'email' placeholder='Email@exmaple.com' value={Email} onChange={onChangeHandler}/>
                <label style={{marginTop : '5px'}}>패스워드</label>
                <input className = 'input-style' name='password' type = 'password' placeholder = 'Password' value={Password} onChange={onChangeHandler}/>
                <button className='btn btn-primary input-style' style={{marginTop : '15px'}}>Sign Up</button>
                <Link style={{marginTop : '15px'}} to='/signin'>Sign In</Link>
            </form>
        </div>
    )
}

export default withRouter(SignUp); 