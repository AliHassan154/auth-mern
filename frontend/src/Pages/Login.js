import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { handleError, handleSuccess } from '../utils';


const Login = () => {
 
      const [loginInfo, setloginInfo ] = useState({
    email: '',
    password: ''
})


const handleChange = (e)=>{
    const {name, value} = e.target;
    console.log(name, value);
    const copyloginInfo = {...loginInfo};
    copyloginInfo[name] = value;
    setloginInfo(copyloginInfo);
    console.log("loginInfo ->", loginInfo);
    
}    
const handleLogin = async (e)=>{
    e.preventDefault();
    const {email, password} = loginInfo;
    if( !email || !password){
        return handleError('Name and Email is required.')
    }
    try {
        const url = "http://localhost:8080/api/auth/login";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(loginInfo)
        })
        const result = await response.json();
        console.log(result);
        const {success, message, error, token, name} = result;
        if(success){
            handleSuccess(message);
            localStorage.setItem('token', token);
            localStorage.setItem('loggedInUser', name); 
            setTimeout(() => {
            navigate('/home');
            }, 1000);
        }else if (error) {
            const details = error.details[0].message;
            handleError(details);
        }
        
    } catch (error) {
        
    }
}
const navigate = useNavigate();


  return (
    <>
    <div className="min-h-screen d-flex justify-content-center align-items-center vh-100">
            <form onSubmit={handleLogin}>
                <div className="mb-3">
            <h2 className='text-2xl font-bold mb-4 text-center text-gray-800'>Login</h2>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input onChange={handleChange} type="text" name='email' value={loginInfo.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input onChange={handleChange} type="text" name='password' value={loginInfo.password} className="form-control" id="exampleInputPassword1"/>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <p className="mt-3 text-sm">
          Don't have an account?{" "}
          <span
            className="text-primary cursor-pointer"
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/SignUp")}
          >
            SignUp 
          </span>
        </p>
        </form>
    </div>
    </>
  )
}

export default Login
