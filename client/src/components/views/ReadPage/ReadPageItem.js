import React from 'react'

const ReadPageItem = ({value,index, DetailPage}) => {
    return (
        <li className='list-group-item' key={index}>
            <h4 onClick = {(e)=>{DetailPage(value.id,e)}}> {value.title} </h4>
            <label>작성자 : {value.author}</label>
            {
                value.likes === 0
                ? <p>🤍</p>
                : <p>❤</p>
            }
        </li>
    )
}

export default ReadPageItem
