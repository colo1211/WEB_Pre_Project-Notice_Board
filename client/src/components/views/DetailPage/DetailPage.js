import React, { useEffect, useState } from 'react'
import { useParams,useHistory } from 'react-router'
import axios from 'axios'; 
import {Button} from 'react-bootstrap';

const DetailPage = () => {

    const history = useHistory(); 
    const { id } = useParams(); 
    const [DetailContents, setDetailContents] = useState(null); 
    
    useEffect(()=>{
        let token = JSON.parse(localStorage.getItem('user')).accessToken;

        axios.get(`/api/board/${id}`, {
            headers : {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response)=>{
            // console.log(`통신 result ${JSON.stringify(response.data)}`)
            setDetailContents(response.data);
            console.log(DetailContents); 
        })
        .catch((e)=>console.log(e))
        .finally(()=>{
            console.log('기다려')
        });
    },[]);



    return (
        <div className='container'>
            {
                DetailContents && 
                <div>
                    <h2>{DetailContents.title}</h2> 
                    <p>작성자 : {DetailContents.author}</p>
                    <p>실험 일자 : {DetailContents.doDate}</p>
                    <p>학교 : {DetailContents.schoolName}</p>
                    <p>연락처 : {DetailContents.contact}</p>
                    <p>실험 장소 : {DetailContents.place}</p>         
                </div>
            }
            <Button className= 'btn btn-primary' onClick={()=>{history.goBack()}}>뒤로 가기</Button>
        </div>
    )
}

export default DetailPage
