import React, { useEffect, useState } from 'react'
import { useParams,useHistory } from 'react-router'
import axios from 'axios'; 
import {Button} from 'react-bootstrap';
import UpdateForm from '../UpdateForm/UpdateForm';
import './DetailPage.scss'; 

const DetailPage = () => {

    const [isUpdate, setisUpdate] = useState(false);
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
    },[isUpdate]);

    const onUpdateHandler = () => {
        setisUpdate(true); 
    }


    // 삭제하기
    const onDeleteHandler = (e) =>{
        e.preventDefault();
        // 사용자가 삭제 승인을 하면 삭제 진행
        if (window.confirm('정말 삭제하겠습니까?')===true){
            let token = JSON.parse(localStorage.getItem('user')).accessToken;
            axios.delete(`/api/board/${id}`,{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            .then(()=>{
                history.push('/'); 
                alert('삭제에 성공하였습니다.')
            })
            .catch(()=>{alert('삭제에 실패하였습니다.')})
        }
    }


    return (
        <div className='container'>
            {
                isUpdate 
                ? <UpdateForm DetailContents={DetailContents} setisUpdate={setisUpdate}/>
                : null 
            }
            {
                DetailContents && 
                <div>
                    <h2>{DetailContents.title}</h2> 
                    <p>작성자 : {DetailContents.author}</p>
                    <p>실험 일자 : {DetailContents.doDate}</p>
                    <p>학교 : {DetailContents.schoolName}</p>
                    <p>연락처 : {DetailContents.contact}</p>
                    <p>실험 장소 : {DetailContents.place}</p> 
                     
                    
                    <Button className= 'btn btn-danger' onClick={onUpdateHandler}>수정</Button>
                    <Button className= 'btn btn-danger ml-3' onClick={onDeleteHandler}>삭제</Button>
                    <Button className= 'btn btn-primary ml-3' onClick={()=>{history.goBack()}}>Back</Button>
                </div>
            }
            
        </div>
    )
}

export default DetailPage
