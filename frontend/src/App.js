import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import HomeComponent from "./Pages/HomeComponent";
import RefreshHandler from "./RefreshHandler";
function App() {
const [isAuthenticated, setIsAuthenticated] = useState(false);
  
const PrivateRoute = ({element})=>{
  return isAuthenticated ? element : <Navigate to='/login' />
}
  

  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Navigate to="/login"/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<PrivateRoute element={<HomeComponent />}/>} />
    </Routes>
    <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="colored"
      />

    </div>
  );
}

export default App;
