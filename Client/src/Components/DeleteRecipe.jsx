import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleDelete = async () => {
      try {
        // Send a DELETE request to the server to delete the recipe
        await axios.delete(`http://localhost:8000/recipe/delete-recipe/${id}`);
        console.log('Recipe deleted successfully');

        // Redirect to the desired page after successful deletion
        navigate.push('/recipes'); // Redirect to the recipes page, for example
      } catch (error) {
        console.error('Error deleting recipe:', error);
        // Handle error, show a notification, or redirect to an error page
      }
    };

    // Call the delete function
    handleDelete();
  }, [id, history]);

  return (
    <div>
      <p style={{ color: 'orange', fontWeight: 'bold',fontSize: '2em',display:'flex',justifyContent: 'center', alignItems: 'center'}}>Deleting recipe...</p>
  </div>
      
  );
};

export default DeleteRecipe;
