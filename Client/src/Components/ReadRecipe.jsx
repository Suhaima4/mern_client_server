

import axios from 'axios'
import React,{ useState,useEffect} from 'react'
import { useParams,Link} from 'react-router-dom'
import '../styles/style.css';

function ReadRecipe() {

const {id} = useParams()
const userId = window.localStorage.getItem("id")
const [recipe,setRecipe] = useState([])
const [savedRecipes,setSavedRecipes] = useState([])


useEffect(() =>{
  const getRecipe = () =>{
    axios.get('http://localhost:8000/recipe/recipe-by-id/'+id)
    .then(result =>{
      setRecipe(result.data)
    })
    .catch(err=>console.log(err))
  }
const fetchSavedRecipes = () =>{
  axios.get("http://localhost:8000/recipe/saved-recipes/"+ userId)
    .then(result =>{
      setSavedRecipes(result.data.savedRecipes)
      setRecipe(result.data)
    })
    .catch(err=>console.log(err))
  }
fetchSavedRecipes()
getRecipe()
},[])    //new add
          const savedRecipe = (recipeId) =>{
            axios.put('http://localhost:8000/recipe',{ userId, recipeId})       //userId,recipeId
            .then(result => (
              setSavedRecipes(result.data.savedRecipes)
            )).catch(err => console.log(err))
          }

        const isRecipeSaved = (id) => savedRecipes.includes(id);
        
  return (
    <div className='d-flex justify-content-center container mt-3 page-container'>
      <div className='p-2'>
        <img src = {recipe.imageUrl} alt ="recipe"   style={{ maxWidth: '1200px',width: '100%' , height: 'auto'
       }}/>
     </div>
<div className=' p-2'>
  <h2>{recipe.name}</h2>
  <button className='btn btn-warning'

  onClick = { () => savedRecipe(recipe._id)}
  disabled = {isRecipeSaved(recipe._id)}>

    {isRecipeSaved(recipe._id) ? "saved" :"save"}
   </button>

   <Link to={`/recipe/update-recipe/${recipe._id}`} className='btn btn-warning mr-2'>
                  Update
                </Link>     
  
 
    
  <h4>Ingredients</h4>
  <p>{recipe.ingredients}</p>
  <h4>Description</h4>
  <p>{recipe.description}</p>
</div>


    </div>
 
  )
}

export default ReadRecipe