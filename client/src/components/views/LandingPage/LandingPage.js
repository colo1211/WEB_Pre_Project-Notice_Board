import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

const LandingPage = () => {

    const isLogin = useSelector((state) => state.user.isLogin); 
    
    return (
        <div>
            Landing Page
            <p>반갑습니다!</p>
            
        </div>
    )
}

export default LandingPage;
