import React, { useEffect, useState } from 'react'
import { handleSuccess } from '../utils';
import { useNavigate } from 'react-router-dom';

const HomeComponent = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  },[]);

  const fetchProducts = async ()=>{
    try {
      const url = "http://localhost:8080/api/product/products";
      const headers = {
        headers: {
          'Authorization': localStorage.getItem('token'),
        }
      }
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);
      setProducts(result);
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    fetchProducts();
  }, []);

  const handleLogOut = ()=>{
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('token');
    handleSuccess("You are logged out.");
    navigate('/login');
  } 

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='text-center'>
      <h1>Welcome {loggedInUser}</h1>
      <button onClick={handleLogOut} type="button" className="btn btn-primary">Log Out</button>
      <div>
        {
          products && products?.map((item, index)=>{
           return (
            <li key={index}>
              <span>{item.name} : {item.price}</span>
            </li>
           )
          })
        }
      </div>
      </div>
    </div>
  )
}

export default HomeComponent
