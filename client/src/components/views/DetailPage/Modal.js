import React from 'react'
import './Modal.scss'; 
import {useHistory} from 'react-router-dom'

const Modal = ({Id, NoticeList}) => {
    const history = useHistory(); 
    console.log(Id, NoticeList);
    return (
        <div className='modal-wrap'>
            <div className='inner-wrap'>
                <h4>{NoticeList[Id].title}</h4>
                <button onClick = {()=>{history.goBack()}} className='btn btn-danger'>뒤로 가기</button>
            </div>
        </div>
    )
}

export default Modal
