import React from 'react'

const Pagenation = ({ postsPerPage, totalPosts, paginate }) => {
const pageNumbers = [];

for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){
    pageNumbers.push(i); 
}


    return (
            <ul className = 'pagination mt-5' style={{display: 'flex', justifyContent: 'center'}}>
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
            </ul>
    )
}

export default Pagenation
