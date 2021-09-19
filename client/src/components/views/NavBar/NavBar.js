import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; 
import { logoutAction } from '../../../_actions/user_action';

function NavBar() {
    const dispatch = useDispatch(); 

    const logOutHandler = (e) => {
        dispatch(logoutAction())
        localStorage.setItem('accessToken', '');
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
