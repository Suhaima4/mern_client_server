import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateRecipe() {
  
  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    ingredients: '',
    imageUrl: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/recipe/${id}`);
        setRecipe({
          name: response.data.name,
        description: response.data.description,
        ingredients: response.data.ingredients, 
        imageUrl: response.data.imageUrl,
        });
        console.log(response.data)
      
      } catch (error) {
        console.log(error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.put(`http://localhost:8000/recipe/update-recipe/${id}`,{
    name: recipe.name,
    description: recipe.description,
    ingredients: recipe.ingredients,
    imageUrl: recipe.imageUrl,
  })
      .then((result) => {
        navigate('/home');
        console.log(result.data);
        window.alert('Successfully updated');
      })
      .catch((err) => console.log(err));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='p-3 border border-1 w-25 '>
      <h3 style={{ fontWeight: 'bold' ,color:'yellow'}}>Update Recipe</h3>
        <form onSubmit = {handleSubmit}>
          <div className='mt-3'>
            <label htmlFor='name'>Recipe Name</label>
            <input type='text' value={recipe.name} className='form-control' name='name' onChange={handleChange} />
          </div>

          <div className='mt-3'>
            <label htmlFor='description'>Description</label>
            <textarea value={recipe.description} className='form-control' name='description'  onChange={handleChange} />
          </div>

          <div className='mt-3'>
            <label htmlFor='ingredients'>Ingredients</label>
            <textarea value={recipe.ingredients} className='form-control' name='ingredients'  onChange={handleChange} />
          </div>

          <div className='mt-3'>
            <label htmlFor='imageUrl'>Image URL</label>
            <input type='text' value={recipe.imageUrl} className='form-control' name='imageUrl' onChange={handleChange} />
          </div>

          <button className='mt-1 btn btn-success w-100 mt-2 mb-3'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateRecipe;
