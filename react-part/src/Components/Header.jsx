import React from 'react'
import './Header.css'
import { Link,useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

function Header(props) {

  const navigate= useNavigate()

const handleLogout=()=>{
  localStorage.removeItem('token');
  navigate('/login');
}

const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    props.handleclick && props.handleclick();
  }
};

  return (
    <div className='header-container d-flex justify-content-between'>
      <div className='header'>
        <Link className='links' to='/'>HOME</Link>

        <input className='search' type="text" value={props && props.search}
           onChange={(e)=>props.handlesearch && props.handlesearch(e.target.value)}
           onKeyDown={handleKeyPress}
        />
        <button className='search-btn' onClick={() => props.handleclick && props.handleclick() }  ><FaSearch/></button>

      </div>
      <div>

      {!!localStorage.getItem('token') && <Link to='/my-uploads'><button className='logout-btn'>My Uploads</button> </Link>}
      {!!localStorage.getItem('token') && <Link to='/liked-products'><button className='logout-btn'>WishList </button> </Link>}


         {!localStorage.getItem('token') ?
          <Link to="/login" className='logout-btn'> LOGIN</Link> :
          <button className='logout-btn' onClick={handleLogout}>Logout</button>}
          
          

      </div>
    </div>
  )
}

export default Header

