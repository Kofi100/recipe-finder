import { useState, useEffect } from "react";

import { fetchRecipes } from "../services/fetchRecipes";

import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";

import './styles/Home.css'

export default function Home() {
    const [query, setQuery] = useState("");//query:String
    const [recipes, setRecipes] = useState([]);//array
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        setisLoading(true);
        fetchRecipes(query)
            .then(setRecipes)
            .catch ((err) => setError(err.message))
            .finally(() => setisLoading(false));
    
    }, [query]);
    return (
        < div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <h1>Quick Recipe Finder App</h1>
            <section style={{textAlign:"center"}}>Powered by <a href="https://www.themealdb.com/">TheMealDB</a></section>
            <SearchBar value={query} onChange={setQuery} />

            {isLoading&&<p>Loading...</p>}
            {error && <p>{error}</p>}


            <div className="recipe-grid" >
                {/* className="grid gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3" */}
        {/* {recipes.map(recipe => (
          <div key={recipe.idMeal} className="p-4 border rounded">
            <h2>{recipe.strMeal}</h2>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          </div>
        ))} */}
        {recipes.map(recipe => (
                    <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
                
                
        </div>


        {/* console.log({recipes}); */}
        </div>
    )

}