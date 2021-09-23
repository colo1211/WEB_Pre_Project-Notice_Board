import React, { useState } from 'react'
import './UpdateForm.scss'; 
import axios from 'axios'; 
import { useHistory } from 'react-router';
import SchoolList from '../ReadPage/SchoolList';

const UpdateForm = ({DetailContents,setisUpdate}) => {
    console.log(DetailContents); 
    const history = useHistory(); 
    
    const schoolList = require('../ReadPage/SchoolList').default;

    const schoolId = schoolList.find((value,index)=>{
        return DetailContents.schoolName === value.name;
    }).id;

    console.log(schoolId);
    const [body,setBody] = useState({
        ...DetailContents,
        title : DetailContents.title, 
        content : DetailContents.content, 
        place : DetailContents.place, 
        pay : DetailContents.pay , 
        time : DetailContents.time, 
        phoneNum : DetailContents.contact,
        schoolId : schoolId, 
        dueDate : DetailContents.dueDate, 
        doDate : DetailContents.doDate
    }); 
    
    const onBodyChange = (e) => {
        setBody({ 
            ...body,
            [e.target.name] : e.target.value
        })
        console.log(body); 
    }


    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(body); 
        let formData = new FormData(); 
        formData.append('title', body.title);
        formData.append('content', body.content);
        formData.append('place', body.place);
        formData.append('schoolId', body.schoolId);
        formData.append('pay', body.pay);
        formData.append('time', body.time);
        formData.append('phoneNum', body.phoneNum);
        formData.append('dueDate', body.dueDate);
        formData.append('doDate', body.doDate);
        formData.append('fileChanged', false);

        let token = JSON.parse(localStorage.getItem('user')).accessToken;
        
        axios.post(`/api/board/${DetailContents.id}`, formData, 
        {
            headers:{
                Authorization : `Bearer ${token}`
            }
        }
        )
        .then((response)=>{
            if (response.data){
                alert('수정이 완료되었습니다.'); 
                setisUpdate(false);
            }
        })
        .catch((e) => {
            console.log(e); 
        })
        
    }

    return (
        <div className='form-container'>
            <div className='inner-wrap'>
                <form onSubmit= {onSubmitHandler}>
                    <p>제목</p>
                    <input name='title' className= 'input-layout' value={body.title} onChange={onBodyChange}></input>
                    <p>내용</p>
                    <input name='content' className= 'input-layout' value={body.content} onChange={onBodyChange}></input>
                    <p>장소</p>
                    <input name='place' className= 'input-layout' value={body.place} onChange={onBodyChange}></input>
                    <p>급여</p>
                    <input name='pay' className= 'input-layout' value={body.pay} onChange={onBodyChange}></input>
                    <p>소요시간</p>
                    <input name='time' className= 'input-layout' value={body.time} onChange={onBodyChange}></input>
                    <p>연락처</p>
                    <input name='contact' className= 'input-layout' value={body.contact} onChange={onBodyChange}></input>
                    <p>학교</p>
                    <select name='schoolId' className= 'input-layout' onChange={onBodyChange}>
                        <option defaultValue> {DetailContents.schoolName} </option>
                        {
                            schoolList.map((value,index)=>{
                                return (
                                    <option key={index} value={value.id}>{value.name}</option>
                                )
                            })
                        }
                    </select>
                    <p>마감날짜</p>
                    <input name='dueDate' className= 'input-layout' type='date' value={body.dueDate} onChange={onBodyChange}></input>
                    <p>실험날짜</p>
                    <input name='doDate' className= 'input-layout' value={body.doDate} onChange={onBodyChange}></input>
                    <button onClick = {()=> {
                        setisUpdate(false);
                    }} className='btn btn-primary mt-5'>닫기</button>
                    <button onClick = {onSubmitHandler} className='btn btn-danger ml-2 mt-5'>제출</button>
                </form> 
            </div>
        </div>
    )
}

export default UpdateForm
