import Signup from "./Components/Signup";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./Components/Login";
import Home from "./Components/Home";
import Header from "./Components/Header";
import SavedRecipe from "./Components/SavedRecipe";
import CreateRecipe from "./Components/CreateRecipe";
import ReadRecipe from "./Components/ReadRecipe";
import UpdateRecipe from "./Components/UpdateRecipe";
import DeleteRecipe from "./Components/DeleteRecipe";
import Footer from "./Components/Footer";


function App() {
  return (
    <BrowserRouter>
    
      <Header/>
      <Routes>
       <Route path="/" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
       
        <Route path="/recipe/create-recipe" element={<CreateRecipe />} />
        <Route path="/recipe/saved-recipe" element={<SavedRecipe />} />
        <Route path="/read-recipe/:id" element={<ReadRecipe />} />
        <Route path="/recipe/delete-recipe/:id" element = {<DeleteRecipe/>} />
        <Route path="/recipe/update-recipe/:id" element={<UpdateRecipe />}/>
        
      </Routes>
      <Footer/>
    
    </BrowserRouter>
  );
}

export default App;
