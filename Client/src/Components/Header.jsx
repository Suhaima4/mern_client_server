import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import {Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

function Header() {
 const navigate = useNavigate();

const handleLogout = () => {
 window.localStorage.clear()
 axios.get('http://localhost:8000/auth/logout')
 .then(res =>
   navigate('/auth/login'))

 .catch(err =>console.log(err))
}
       
               
  return (
   
    
    <Nav className="navbar navbar-expand-lg navbar-dark bg-dark" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/home" className="text-white" >Online Recipes</Nav.Link>
      </Nav.Item>
      <Nav.Item>
      
        <Nav.Link  href="/recipe/create-recipe" className="text-white">Create</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/recipe/saved-Recipe"  className="text-white">Saved Recipes</Nav.Link>
      </Nav.Item>
     
      <div className="ms-auto">
                {
                    window.localStorage.getItem("id")? (
                    <div className="ms-2 text-white">
                    <button className="btn btn-outline-light" onClick = {handleLogout} >
                    Logout
                    </button>
                    </div>
                     ) : (
                
                <button className="btn btn-outline-light" >

                    <Link to ="/" className='text-decoration-none'>Signup/Login
                    </Link></button>
                    
   )}
   </div>
   
</Nav>
        

    
  )
}

export default Header