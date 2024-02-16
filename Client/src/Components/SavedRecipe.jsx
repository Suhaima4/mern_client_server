import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';
function SavedRecipe() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userId = window.localStorage.getItem('id');

  useEffect(() => {
    const fetchSavedRecipes = () => {
      
      axios.get('http://localhost:8000/recipe/user-recipes/'+ userId)
        .then(recipes => {
          setSavedRecipes(recipes.data);
        })
        .catch(err => {
         setError(<div style={{ textAlign: 'left', fontWeight: 'bold', color: 'red' }}>Error fetching saved recipes...!</div>);
         console.log(err);
          
        })
        .finally(() => setLoading(false));
    };

    fetchSavedRecipes();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='d-flex justify-content-center  container mt-3 saved-form'>
      <div className='p-2'>
        <h2>Saved Recipes</h2>
        {savedRecipes.map(recipe => (
          
          <div key={recipe._id} className='mt-4 p-3 border'>
            <Link to={`/read-recipes/${recipe._id}`} className='text-decoration-none'>
              <h3>{recipe.name}</h3>
            </Link>
            <img src={recipe.imageUrl} alt='Recipe'  style={{ width: '200px', height: '150px' }}/>
            <h4>{recipe.description}</h4>
            <h4>{recipe.ingrediants}</h4>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedRecipe;
