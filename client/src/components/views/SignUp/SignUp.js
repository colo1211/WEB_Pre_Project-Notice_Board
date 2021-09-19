import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { registerAction } from '../../../_actions/user_action';
import { withRouter } from 'react-router';

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
                <input name='name' type = 'text' value={Name} onChange={onChangeHandler}/>
                <label>이메일</label>
                <input name='email' type = 'email' value={Email} onChange={onChangeHandler}/>
                <label>패스워드</label>
                <input name='password' type = 'password' value={Password} onChange={onChangeHandler}/>
                <button style={{marginTop : '15px'}}>회원 가입</button>
            </form>
        </div>
    )
}

export default withRouter(SignUp); 