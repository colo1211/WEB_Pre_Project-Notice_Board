import React, { useEffect, useState } from 'react'
import './ReadPage.scss'; 
import axios from 'axios'; 
import {Button, Pagination} from 'react-bootstrap'; 
import { useHistory, useParams } from 'react-router';
import ReadPageItem from './ReadPageItem';
import Pagenation from './Pagenation'; 

const ReadPage = () => {

    const history = useHistory(); 
    const schoolList = require('./SchoolList').default; 
    const [Date, setDate] = useState('');
    const [School, setSchool] = useState('');
    const [like, setlike] = useState('');

    // 글 목록을 담는 배열
    const [NoticeList, setNoticeList] = useState([]);

    // Pagination 을 위한 배열
    const [posts, setPosts] = useState([]); 

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(2);  

      // Get current Posts
    const indexOfLastPost = currentPage * postPerPage; // 1 * 10
    const indexOfFirstPost =  indexOfLastPost - postPerPage; // 10 - 10

    // 하나의 페이지에 띄울 용도
    const currentPosts = NoticeList.slice(indexOfFirstPost, indexOfLastPost);

    console.log('indexOfLastPost',indexOfLastPost,'indexofFirstPost',indexOfFirstPost,'currentPosts',currentPosts); 

    
    // Change Page -> Pagination Component에 Props로 넘겨준다. 
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // 이전 
    const paginateDown = () => {
        if(currentPage-2 >=0){
            let temp = currentPage-1;
            setCurrentPage(temp);  
        }else{
            alert('이전 페이지가 없습니다')
        }
    };

    // 다음 
    const paginateUp = () => {
        if ( currentPage+1 <= Math.ceil(NoticeList.length/postPerPage)){
            let temp = currentPage+1; 
            setCurrentPage(temp);
        }else{
            alert('다음 페이지가 없습니다');
        }
    }; 

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
            <ul className='list-group mt-5' style={{width : '70%', margin:'auto'}}>

            {
                NoticeList.length === 0
                ? null
                : 
                    currentPosts.map((value,index)=>{
                        return <ReadPageItem key={index} value={value} index={index} DetailPage={DetailPage} /> 
                    })
            }

            {
                currentPosts.length !== 0
                ? <Pagenation postsPerPage={postPerPage} totalPosts={NoticeList.length} paginate={paginate} paginateDown={paginateDown} paginateUp={paginateUp} />   
                : null
            }
            </ul>
            

        </div>
    )
}

export default ReadPage;
