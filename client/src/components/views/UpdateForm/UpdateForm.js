import React, { useEffect, useState } from 'react'
import './UpdateForm.scss'; 
import axios from 'axios'; 
import { useHistory } from 'react-router';
import SchoolList from '../ReadPage/SchoolList';

const UpdateForm = ({DetailContents,setisUpdate}) => {
    

    useEffect(()=>{
        if (DetailContents.images[0]){
            setAttachment(DetailContents.images[0].url);
        }
    },[]);

    const history = useHistory(); 
    const schoolList = require('../ReadPage/SchoolList').default;
    const schoolId = schoolList.find((value,index)=>{
        return DetailContents.schoolName === value.name;
    }).id;

    // 미리보기 용
    const [Attachment, setAttachment] = useState(null);
    
    // Server request용
    const [FileInfo, setFileInfo] = useState(null); 

    const [fileChange, setFileChange] = useState(false); 

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

    // 파일이 바뀌었다면 FileChange를 true로 변경해준다. 
    const onFileChange = (e) => {
        setFileInfo(e.target.files[0]);
        setFileChange(true); 
        const reader = new FileReader(); 
        reader.readAsDataURL(e.target.files[0]);  // e.target.files는 파일을 여러개 선택을 대비하기 위한 API 사용 방법이므로 나는 하나만 할거니까 [0] 으로 선택 
        reader.onloadend = (finished) => { // reader는 생명주기함수처럼 다룬다. 파일 로드가 끝나면 Attachment state에 img 의 주소를 담으라는 뜻
            setAttachment(finished.target.result); // 이건 attachment에 URL을 담으라는 뜻, 만약 Img 미리보기를 취소하려면 attachment를 비워주면 된다. 
        }
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
        formData.append('fileChanged', fileChange);
        if (fileChange === true) {
            formData.append('files', FileInfo);
        }

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
                    <textarea name='content' style ={{height: '300px'}} className= 'input-layout' value={body.content} onChange={onBodyChange}></textarea>
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
                    <p>파일 업로드</p>
                            <input type='file' onChange={onFileChange}/>
                            <img src={Attachment} width='80px' height='100px'/>
                    
                    <hr/>
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
