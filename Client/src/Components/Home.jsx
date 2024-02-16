import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css'
function Home() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8000/recipe/recipes')
      .then(recipes => {
        setRecipes(recipes.data);
      })
      
        .catch(error => {
          console.error("Error fetching recipes:", error);


      })

  }, []);
          

 return (  
 <div className='container mt-4 home-container'>
 <h2 className='text-center mb-4 '></h2>
  <div className='row'>
    {recipes.map(recipe => (
      <div key={recipe._id} className='col-md-4 mb-4'>
        <div className='card'>
          <img
            src={recipe.imageUrl}
            alt='Recipe'
            className='card-img-top'
            style={{
              maxHeight: '200px',
              objectFit: 'cover',
            }}
          />

<div className='card-body'>
                <h5 className='card-title'>{recipe.name}</h5>
                <Link to={`/read-recipe/${recipe._id}`} className='btn btn-primary mr-2'>
                  View Recipe
                </Link>
               
                <Link to={`/recipe/delete-recipe/${recipe._id}`} className='btn btn-danger'>
  Delete
</Link>
               
              </div>
            </div>
          </div>  
    ))}
      </div>
    </div>                     
                              
  );
}

export default Home;
