import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; 
import { useHistory } from 'react-router'; 
import { logoutAction } from '../../../_actions/user_action';

function NavBar() {

    const isLogin = useSelector((state) => state.user.isLogin); 
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
        localStorage.removeItem('userId'); 
    }

    return (
        <div>
            {/* <ul>
                <li><Link to = '/'>Home</Link></li>
                <li><Link to = '/SignIn'>SignIn</Link></li>
                <li><Link to = '/SignUp'>SignUp</Link></li>
                <button onClick={logOutHandler}>Sign Out</button>
            </ul> */}
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Notice Board</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                    
                        {
                            isLogin &&
                            (<ul class="navbar-nav">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page"><Link to = '/'>Home</Link></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" onClick={logOutHandler}> Sign Out </a>
                                </li>
                            </ul>)
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar
