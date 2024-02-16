
const express = require('express')
const RecipeModel = require('../models/Recipe')
const UserModel = require('../models/User')

const router = express.Router()

router.post('/create-recipe',(req,res)=>
    RecipeModel.create({
        name:req.body.name,
        description:req.body.description,
        ingredients:req.body.ingredients,
        imageUrl:req.body.imageUrl,
        userId:req.body.userId
    }).then(result =>{
        return res.json(result)
    }).catch(err => console.log(err))


)
router.get('/recipes',(req,res)=>{
    RecipeModel.find()
    .then(recipes=>{
        return res.json(recipes)
    }).catch(err =>res.json(err))
})
router.get('/recipe-by-id/:id',(req,res)=>{
    const id = req.params.id;
    RecipeModel.findById({_id:id})
    .then(result =>{
        return res.json(result)
    }).catch(err =>res.json(err))

})
 router.get('/saved-recipe/:id',(req,res)=>{
    const id = req.params.id;
    UserModel.findById({_id : id})
    .then(result => {
        console.log(result)
        return res.json({savedRecipes : result.savedRecipes})
    })
    .catch(err => res.status(500).json(err))
 })

router.get('/user-recipes/:id', async (req,res)=>{
    const id = req.params.id;
    try{
    const user = await UserModel.findById({_id: id})
    const recipes = await RecipeModel.find({_id:{$in :user.savedRecipes}
    })

res.status(201).json(recipes);
}
catch(err)
{
    res.status(500).json(err)
}
})
router.put('/', async (req, res) => {
  const recipe = await RecipeModel.findById({ _id: req.body.recipeId }); // Fix here

   const user = await UserModel.findById({ _id: req.body.userId }); 
   user.savedRecipes.push(recipe);
   user.save();
  return res.json({ savedRecipes: user.savedRecipes });
})
 


// Fetch a specific recipe
router.get('/:id', async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a recipe
router.put('/update-recipe/:id', async (req, res) => {
  try {
    console.log('Received Recipe ID:', req.params.id);
    console.log('Received Recipe Data:', req.body);

    const { name, description, ingredients, imageUrl } = req.body;

    // Validate request body fields as needed

    const updatedRecipe = await RecipeModel.findByIdAndUpdate(
      req.params.id,
      { name, description, ingredients, imageUrl },
      { new: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    console.log('Updated Recipe:', updatedRecipe);

    res.json({ data: updatedRecipe }); // Consistent response format
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


    
  
router.delete('/delete-recipe/:id', async (req, res) => {
  const recipeId = req.params.id;
  
  try {
    const recipe = await RecipeModel.findByIdAndDelete(recipeId);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    return res.json(recipe);
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

  


 

module.exports = router;





