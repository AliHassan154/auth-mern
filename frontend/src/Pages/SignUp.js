import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { handleError, handleSuccess } from '../utils';



const SignUp = () => {
    const [signupInfo, setsignupInfo ] = useState({
    name: '',
    email: '',
    password: ''
})


const handleChange = (e)=>{
    const {name, value} = e.target;
    console.log(name, value);
    const copysignupInfo = {...signupInfo};
    copysignupInfo[name] = value;
    setsignupInfo(copysignupInfo);
    console.log("signupInfo ->", signupInfo);
    
}    
const handleSignup = async (e)=>{
    e.preventDefault();
    const {name, email, password} = signupInfo;
    if(!name || !email || !password){
        return handleError('All fields are required.')
    }
    try {
        const url = "http://localhost:8080/api/auth/signup";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(signupInfo)
        })
        const result = await response.json();
        console.log(result);
        const {success, message, error} = result;
        if(success){
            handleSuccess(message);
            setTimeout(() => {
            navigate('/login');
            }, 1000);
        }else if (error) {
            const details = error.details[0].message;
            handleError(details);
        }else if (!success) {
            handleError(message);
        }
        
    } catch (error) {
        handleError(error);
    }
}
const navigate = useNavigate();


  return (
    <div className="min-h-screen d-flex justify-content-center align-items-center vh-100">
            <form onSubmit={handleSignup}>
                <div className="mb-3">
            <h2 className='text-2xl font-bold mb-4 text-center text-gray-800'>SignUp</h2>
            <label htmlFor="exampleInputName1" className="form-label">Name</label>
            <input onChange={handleChange} type="text" name='name' value={signupInfo.name} className="form-control" id="exampleInputName1"/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input onChange={handleChange} type="text" name='email' value={signupInfo.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input onChange={handleChange} type="text" name='password' value={signupInfo.password} className="form-control" id="exampleInputPassword1"/>
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
        <p className="mt-3 text-sm">
          Already have an account?{" "}
          <span
            className="text-primary cursor-pointer"
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/login")}
          >
            Login 
          </span>
        </p>
        </form>
    </div>
  )
}

export default SignUp

