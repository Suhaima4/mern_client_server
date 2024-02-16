import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../styles/style.css';
import { Link, useNavigate } from 'react-router-dom';


function Login() {

  
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      if (error !== 'Please enter a valid email address.') {
      setError('Please enter a valid email address.');
      }
      return;
      
  };

      

  axios.defaults.withCredentials = true;
  
    axios.post('http://localhost:8000/auth/login',{email,password})
    .then(result =>{
      window.localStorage.setItem("id",result.data.id)
      navigate('/home')
      console.log(result)
      window.alert("Successfully logged in!");
    }).catch(err => console.log(err))
  }

     

 return( 
  <div className='form-container'>
 <div className='d-flex justify-content-center align-items-center vh-100'>
 <div className='p-3 border border-1 w-25 '>
   <h3>LogIn</h3>
         
        <form onSubmit={handleSubmit}>
         
          <div>
            <label htmlFor='email'>Email</label>
            <input type='email' placeholder='Enter your emailId' className='form-control' onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input type='password' placeholder='Enter password' className='form-control' onChange={(e) => setPassword(e.target.value)} required />
          </div>
         
          {error && <p className='text-danger'>{error}</p>}
          <button className='mt-1 btn btn-success w-100'>Submit</button>
          <p>Already have an account? <Link to="/">SignUp here</Link></p>
        </form>
      
</div>
      
 
    </div>
    </div>
  );
 } 

export default Login;
