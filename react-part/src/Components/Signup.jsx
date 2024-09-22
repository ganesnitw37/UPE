import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import axios from 'axios'
import './AuthStyles.css';

function Signup() {

  const [username, setusername]= useState('');
  const [password, setpassword]= useState('');
  const [mobile, setmobile]= useState('');
  const [email, setemail]= useState('');

  const handleApi=()=>{
    const url='http://localhost:4000/signup';
    const data={username,password, mobile, email}
    axios.post(url,data)
    .then((res)=>{
      if(res.data.message){
        alert(res.data.message)
      }
    })
    .catch((err)=>{
       alert("server error");
    })
    }
  
  return (
    <div>
      <div><Header/></div>
      <center>
      <div className='Authentication'>
      <h1>Welcome to SignUp Page</h1>
      <label>Username</label>
      <input className='form-control' type='text' value={username} onChange={(e)=>{
        setusername(e.target.value)
      }}/>
      <label>Mobile</label>
      <input className='form-control'  type='text' value={mobile} onChange={(e)=>{
        setmobile(e.target.value)
      }}/>
      <label>Email</label>
      <input className='form-control'  type='text' value={email} onChange={(e)=>{
        setemail(e.target.value)
      }}/>
      <label>Password</label>
      <input className='form-control'  type='text' value={password} onChange={(e)=>{
        setpassword(e.target.value)
      }}/>
      <br></br>
      <button onClick={handleApi}>SignUp</button>
      <Link to="/login">Login</Link>
      </div>
      </center>
    </div>
  )
}

export default Signup
