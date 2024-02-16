import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';
 

function Signup() {

  
  const [username, setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }


  
    if (password !== passwordConfirmation) {
      setError('Passwords do not match.');
      return;
    }

    axios.post('http://localhost:8000/auth/register', { username, email,password })
      .then(result => {
        navigate('/auth/login');
        console.log(result);
        window.alert("Successfully registered!");
      })
      .catch(err => {
        console.log(err);
      });
  };


 



 return( 
  
 <div className='d-flex justify-content-center align-items-center vh-100'>
 <div className='p-3 border border-1 w-25 transparent-form'>
  
   <h3>SignUp</h3>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='username'>Username</label>
            <input type='text' placeholder='Enter username' className='form-control' onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <input type='email' placeholder='Enter your emailId' className='form-control' onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input type='password' placeholder='Enter password' className='form-control' onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div>
            <label htmlFor='passwordConfirmation'>Confirm Password</label>
            <input type='password' placeholder='Confirm password' className='form-control' onChange={(e) => setPasswordConfirmation(e.target.value)} required />
          </div>
          {error && <p className='text-danger'>{error}</p>}
          <button className='mt-1 btn btn-success w-100'>Submit</button>
          <p>Already have an account? <Link to="/auth/login">Login here</Link></p>
        </form>
      

      
 
   </div>
    </div>
    
    
  );
}

export default Signup;
