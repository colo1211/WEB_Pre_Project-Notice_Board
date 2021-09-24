import React, { useEffect, useState } from 'react'
import './ReadPage.scss'; 
import axios from 'axios'; 
import {Button} from 'react-bootstrap'; 
import { useHistory, useParams } from 'react-router';

const ReadPage = () => {
    
    const history = useHistory(); 
    const schoolList = require('./SchoolList').default; 
    const [Date, setDate] = useState('');
    const [School, setSchool] = useState('');
    const [like, setlike] = useState('');

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
        axios.get(`/api/board/school/${School}/list?date=${Date}&page=1&size=5`,
        {
            headers : {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response)=> {
            // 해당 날짜, 대학교에 해당하는 조건이 존재한다면 게시물에 띄운다. 
            if (response.data.content.length!==0){
                console.log(response.data);
                setNoticeList(response.data.content);
            }
            // 해당 날짜, 대학교에 해당하는 조건이 존재하지 않는다면 알림창을 띄운다.
            else {
                console.log(response.data);
                alert('조회된 게시물이 없습니다.'); 
            }
        })
        .catch((e)=> console.log(e));
    }

    const DetailPage = (id,e) => {
        e.preventDefault(); 
        history.push(`/detail/${id}`); 
    }

    return (
        <div className='calender' style ={{marginTop:'1px', paddingTop : '40px', paddingBottom:'40px'}}>
          
            <h3 style={{marginBottom:'30px'}}>조회할 게시물</h3>
            
            <select className='select-input' onChange = {onSchoolChange}>
                {
                    schoolList.map((value,index)=>{
                        return (<option key={index} value={value.id}> {value.name} </option>); 
                    })
                }
            </select>

            <input className='select-input' style={{height : '36px'}} type='date' onChange= {onDateChange}/> <br/>
            <div style ={{clear : 'both'}}></div>
            <Button onClick={onSubmitHandler} className='mt-4' variant="secondary">게시물 조회</Button>
            
            {
                NoticeList.length === 0
                ? null
                : (NoticeList.map((value,index)=>{
                    return (<div className ='notice-list' key={index}>
                                <h4 onClick = {(e)=>{DetailPage(value.id,e)}}> {value.title} </h4>
                                <label>작성자 : {value.author}</label>
                                {
                                    value.likes === 0
                                    ? <p>🤍</p>
                                    : <p>❤</p>
                                }
                            </div>)
                }))   
            }
        </div>
    )
}

export default ReadPage;
