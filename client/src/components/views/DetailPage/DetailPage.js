import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'; 

const DetailPage = () => {

    const {id} = useParams(); 
    const [DetailContents, setDetailContents] = useState(null); 
    useEffect(()=>{
        let token = JSON.parse(localStorage.getItem('user')).accessToken;
        axios.get(`/api/board/${id}`, {
            headers : {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response)=>{
            setDetailContents(response.data); 
        })
        .catch((e)=>console.log(e)); 
        console.log(`이건 state: ${JSON.parse(DetailContents)}`);
    },[]);

    return (
        <div className='detail-page'>
            {/* <h2>{DetailContents.title}</h2> */}
            {/* <p>{DetailContents.author}</p>
            <p>{DetailContents.doDate}</p>
            <p>{DetailContents.schoolName}</p>
            <p>{DetailContents.contact}</p>
            <p>{DetailContents.place}</p> */}
        </div>
    )
}

export default DetailPage
