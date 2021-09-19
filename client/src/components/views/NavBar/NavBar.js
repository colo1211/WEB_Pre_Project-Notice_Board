import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; 
import { useHistory } from 'react-router'; 
import { logoutAction } from '../../../_actions/user_action';

function NavBar() {
    const history = useHistory(); 
    const dispatch = useDispatch(); 
    const accessToken = useSelector((state)=> state); 
    console.log('accessToken nav',accessToken.user.accessToken);

    const logOutHandler = (e) => {
        dispatch(logoutAction())
        .then(()=>{
            history.push('/signin'); 
        })
        // axios.post('/api/user/logout', null , {
        //     headers: {
        //         Authorization : 'Bearer ' +  localStorage.getItem('accessToken')
        //     }
        // })
        // .then(() => {
        //     history.push('/signin');
        //   }
        // );
        // localStorage.setItem('accessToken', null);
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
