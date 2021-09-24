import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; 
import { useHistory } from 'react-router'; 
import { logoutAction } from '../../../_actions/user_action';
import './NavBar.scss'; 

function NavBar() {
    const user = useSelector((state) => state);     
    const isLogin = useSelector((state) => state.user.isLogin); 
    const name = useSelector((state) => state.user.name); 
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
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid flex-wrap">
                    <div className='flex-box'>
                        <a className="navbar-brand" href="/">Notice Board</a>
                    </div>
                    <div style={{flexGrow:'100'}}></div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                        {
                             isLogin == true && name !== 'Error'&&
                            (
                                <div className="collapse navbar-collapse " id="navbarNav">
                                    <ul className="navbar-nav">
                                        <li className="nav-item flex-box" style={{marginTop:'8px', marginRight: '20px'}}>반갑습니다! {user.user.name}님! </li>
                                        
                                        <li className="nav-item flex-box">
                                            <a className="nav-link" aria-current="page"><Link to='/create' style={{color : 'darkGrey'}}>Create Notice</Link></a>
                                        </li>
                                        
                                        <li className="nav-item flex-box">
                                            <a className="nav-link" onClick={logOutHandler}> Sign Out </a>
                                        </li>
                                    </ul>
                                </div>
                            )
                        }
                </div>
            </nav>
        </>
    )
}

export default NavBar
