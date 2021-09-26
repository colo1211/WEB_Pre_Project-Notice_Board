import React from 'react';

const Pagenation = ({ postsPerPage, totalPosts, paginate, paginateUp, paginateDown}) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){
        pageNumbers.push(i); 
    }


    return (
            <ul className = 'pagination mt-5' style={{display: 'flex', justifyContent: 'center'}}>
                <li className='page-link' onClick={paginateDown}>이전</li>
                {
                    pageNumbers.map(number => (
                        <li key ={number} className='page-item'> 
                            <a onClick={()=>{
                                paginate(number); 
                                }} className = 'page-link'>
                                {number}
                            </a>
                        </li>
                    ))
                }
                <li className='page-link' onClick={paginateUp}>다음</li>
            </ul>
    )
}

export default Pagenation
