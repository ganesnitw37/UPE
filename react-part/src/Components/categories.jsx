import React from 'react'
import './Header.css'
import { Link,useNavigate } from 'react-router-dom'
import Categories from './CategorieList'

function categories(props) {
  
  const navigate = useNavigate();

  return (
    <div className='cat-container'>
      <div>
      <span className='pr-3'>All Categories</span>
        { Categories && Categories.length >0 &&
         Categories.map((item,index)=>{
             return (
              <span 
              onClick={()=>(navigate('/category/'+item))} key={index} className='category'>{item} </span>
             )
         })
        }
      </div>
    </div>
  )
}

export default categories;