import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; 
import { useHistory } from 'react-router'; 
import { logoutAction } from '../../../_actions/user_action';

function NavBar() {
    const history = useHistory(); 
    const dispatch = useDispatch(); 
    
    // 로그아웃 할때, 
    // 1. api/user/logout 서버로 header에 token을 담아서 전송
    // 2. localStorage에 담겨있는 정보를 없애기
    const logOutHandler = (e) => {
        dispatch(logoutAction())
        .then(()=>{
            history.push('/signin'); 
        })
        localStorage.removeItem('user'); 
    }

    return (
        <div>
            <ul>
                <li><Link to = '/'>Home</Link></li>
                <li><Link to = '/SignIn'>SignIn</Link></li>
                <li><Link to = '/SignUp'>SignUp</Link></li>
                <button onClick={logOutHandler}>Sign Out</button>
            </ul>
        </div>
    )
}

export default NavBar
