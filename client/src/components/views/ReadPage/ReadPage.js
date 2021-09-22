import React, { useEffect, useState } from 'react'
import './ReadPage.scss'; 
import axios from 'axios'; 
import {Button} from 'react-bootstrap'; 
import { useHistory, useParams } from 'react-router';
import Modal from '../DetailPage/Modal';
import { useSelector } from 'react-redux';

const ReadPage = () => {
    
    const history = useHistory(); 
    const schoolList = require('./SchoolList').default; 
    const [Date, setDate] = useState('');
    const [School, setSchool] = useState('');
    const [isModal, setisModal] = useState(false); // false 면 숨김/ true 면 나옴
    const [Id, setId] = useState(null);

    // 글 목록을 담는 배열
    const [NoticeList, setNoticeList] = useState([]);

    const onDateChange = (e) => {
        setDate(e.target.value);
    }

    const onSchoolChange = (e) => {
        setSchool(e.target.value);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault(); 
        let token = JSON.parse(localStorage.getItem('user')).accessToken;
        console.log(`/api/board/school/${School}/list?date=${Date}&page=1&size=5`); 
        axios.get(`/api/board/school/${School}/list?date=${Date}&page=1&size=5`,
        {
            headers : {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response)=> setNoticeList(response.data.content))
        .catch((e)=> console.log(e));
    }

    const DetailPage = (id,e) => {
        e.preventDefault(); 
        setId(id); 
        setisModal(true);
    }

    // useEffect(()=>{
    //     console.log(Date); 
    //     console.log(School); 
    // }, [Date, School]); 

    // useEffect(()=> {
    //     let token = JSON.parse(localStorage.getItem('user')).accessToken;
    //     axios.get('/api/board/3', {
    //         headers : {
    //             Authorization: `Bearer ${token}`
    //         }
    //     })
    //     .then((response)=> console.log(`게시물 조회 결과 ${JSON.stringify(response)}`))
    //     .catch((e)=> console.log('게시물 조회 결과',e)); 
    // },[]); 

    return (
        <div className='calender'>
            {
                isModal===true
                ? <Modal Id={Id} NoticeList={NoticeList}/>
                : null
            }
            <h3>조회할 게시물</h3>

            <label>학교</label> <br/>
            <select onChange = {onSchoolChange}>
                {
                    schoolList.map((value,index)=>{
                        return (<option key={index} value={value.id}> {value.name} </option>); 
                    })
                }
            </select>
            <hr/>
            <label>날짜</label><br/>
            <input type='date' onChange= {onDateChange}/> <br/>
            <Button onClick={onSubmitHandler} className='mt-4' variant="secondary">조회</Button>
            
            {
                NoticeList.length === 0
                ? null
                : (NoticeList.map((value,index)=>{
                    return (<div className ='notice-list' key={index}>
                                <h4 onClick = {(e)=>{DetailPage(value.id,e)}}> {value.title} </h4>
                                <label>작성자 :</label>
                                <span>{value.author}</span>
                            </div>)
                }))   
            }
        </div>
    )
}

export default ReadPage;
