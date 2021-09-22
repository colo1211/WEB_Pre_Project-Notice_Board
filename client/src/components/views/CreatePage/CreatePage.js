import React, { useState } from 'react'
import axios from 'axios'; 
import { Button } from 'react-bootstrap'; 

const CreatePage = (props) => {

    const [body,setBody] = useState({
        title : null, 
        content : null, 
        place : null,
        schoolId : null, 
        pay : null , 
        time : null, 
        phoneNum : null, 
        category : null,  
        dueDate : null, 
        doDate : null
    }); 


    const onWriteClose = ()=>{
        props.setWrite(false);
    }

    const onBodyChange = (e) => {
        setBody({
            ...body, 
            [e.target.name] : e.target.value
        });
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        let formData = new FormData(); 
        formData.append('title', body.title);
        formData.append('content', body.content);
        formData.append('place', body.place);
        formData.append('schoolId', body.schoolId);
        formData.append('pay', body.pay);
        formData.append('time', body.time);
        formData.append('phoneNum', body.phoneNum);
        formData.append('category', body.category);
        formData.append('dueDate', body.dueDate);
        formData.append('doDate', body.doDate);
        
        let token = JSON.parse(localStorage.getItem('user')).accessToken;

        axios.post('/api/board', formData,
            {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then((response)=>{
            console.log(response); 
            alert('게시물 생성 완료'); 
        })
        .catch((e)=> console.log(e))
    }


    return (
        <form className='form-layout' onSubmit={onSubmitHandler}>
        <div className = 'form-wrap'>
            <p>제목</p>
            <input name='title' className= 'input-layout' onChange={onBodyChange}></input>
            <p>내용</p>
            <input name='content' className= 'input-layout' onChange={onBodyChange}></input>
            <p>장소</p>
            <input name='place' className= 'input-layout' onChange={onBodyChange}></input>
            <p>학교ID</p>
            <input name='schoolId' className= 'input-layout' onChange={onBodyChange}></input>
            <p>급여</p>
            <input name='pay' className= 'input-layout' onChange={onBodyChange}></input>
            <p>소요시간</p>
            <input name='time' className= 'input-layout' onChange={onBodyChange}></input>
            <p>연락처</p>
            <input name='phoneNum' className= 'input-layout' placeholder='010-1234-5678' onChange={onBodyChange}></input>
            <p> 카테고리 </p>
            <select name='category' className= 'input-layout' onChange={onBodyChange}>
                <option value='Survey'>Survey</option>
                <option value='Experiment'>Experiment</option>
            </select>
            {/* <p>카테고리</p>
            <input className='input-layout' placeholder='SURVEY or EXPERIMENT'></input> */}
            <p>마감날짜</p>
            <input name='dueDate' type ='date' className= 'input-layout' onChange={onBodyChange}></input>
            <p>실험/설문날짜</p>
            <input name='doDate' className= 'input-layout' placeholder='2021-08-10T09:30' onChange={onBodyChange}></input>
            <Button onClick={onWriteClose} className = 'mt-5' variant="primary">닫기</Button>
            <Button onClick={onSubmitHandler} className = 'ml-5 mt-5' variant="danger">제출</Button>
        </div>
    </form>
    )
}

export default CreatePage;
