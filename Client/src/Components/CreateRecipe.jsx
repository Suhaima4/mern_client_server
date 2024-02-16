import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateRecipe() {
  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    ingredients: '',
    imageUrl: '',
    userId: window.localStorage.getItem("id"),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8000/recipe/create-recipe', recipe)
      .then(result => {
        navigate('/');
        console.log(result.data);
        window.alert("sucessfully created")
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='p-3 border border-1 w-25 '>
      <h3 style={{ fontWeight: 'bold' ,color:'white'}}>Create Recipe</h3>
        <form onSubmit={handleSubmit}>
          <div className='mt-3'>
            <label htmlFor='name'>Recipe Name</label>
            <input type='text' placeholder='Enter Name' className='form-control' name='name' onChange={handleChange} />
          </div>

          <div className='mt-3'>
            <label htmlFor='description'>Description</label>
            <textarea placeholder='Enter description' className='form-control' name='description' onChange={handleChange} />
          </div>

          <div className='mt-3'>
            <label htmlFor='ingredients'>Ingredients</label>
            <textarea placeholder='Enter ingredients' className='form-control' name='ingredients' onChange={handleChange} />
          </div>

          <div className='mt-3'>
            <label htmlFor='imageUrl'>Image URL</label>
            <input type='text' placeholder='Enter image URL' className='form-control' name='imageUrl' onChange={handleChange} />
          </div>

          <button className='mt-1 btn btn-success w-100 mt-2 mb-3'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateRecipe;
