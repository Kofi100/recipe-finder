import { useState, useEffect } from "react";

import { fetchRecipes } from "../services/fetchRecipes";

import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";

import './styles/Home.css'
import FilterRecipe from "../components/FilterRecipe";
// import background as '..'

export default function Home() {
    const [query, setQuery] = useState("");//query:String
    const [recipes, setRecipes] = useState([]);//array
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filterValue,setFilterValue]=useState("Filter by Area")
    const [areaDef,setAreaDef]=useState("Filter by Area")

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
            <section style={{textAlign:"center",color:"white"}}>Powered by <a href="https://www.themealdb.com/">TheMealDB</a></section>
            <SearchBar value={query} onChange={setQuery} />
            <FilterRecipe
                value={filterValue}
                onChange={setFilterValue}
                recipesArray={recipes}
                filterKey={"strArea"}
                defaultValue={areaDef} />

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
            <RecipeCard key={recipe.idMeal} recipe={recipe} filterDefaultValue={areaDef} filterValue={filterValue} />
        ))}
                
                
        </div>


        {/* console.log({recipes}); */}
        </div>
    )

}