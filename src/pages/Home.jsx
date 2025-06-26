import { useState, useEffect } from "react";

import { fetchRecipes } from "../services/fetchRecipes";

import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";

import './styles/Home.css'
import FilterRecipe from "../components/FilterRecipe";
import SkeletonCard from "../components/SkeletonCard";
// import background as '..'

export default function Home() {
    const [query, setQuery] = useState("");//query:String
    const [recipes, setRecipes] = useState([]);//array
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filterValue,setFilterValue]=useState("Filter by Area")
    const [areaDef, setAreaDef] = useState("Filter by Area")
    const [favorites, setFavorites] = useState(() => {
        return JSON.parse(localStorage.getItem('favorites')) || [];
    });
    

    useEffect(() => {
        setisLoading(true);
        setError(null);
        //timer delay of 3s
        const timer = setTimeout(() => {
            fetchRecipes(query)
                .then(setRecipes)
                .catch((err) => setError(err.message))
                .finally(() => setisLoading(false));
        }, 1000);
          // Cleanup timeout if query changes quickly
        return () => clearTimeout(timer);
     
    
    }, [query]);

    function toggleFavorite(recipe) {
  //check if recipe is in favourites using idMeal      
    const exists = favorites.find(r => r.idMeal === recipe.idMeal);
    const updated = exists
    //removes recipe if already in favourites list
    //by separating it from the rest as seen in !=== returning no
    //recipe.idMeal
    ? favorites.filter(r => r.idMeal !== recipe.idMeal)
    //adds recipe if it's not in the favourites list
    : [...favorites, recipe];
//set favourites to updated list
        setFavorites(updated);
//save to localStorage by stringfying it
  localStorage.setItem('favorites', JSON.stringify(updated));
    }
    



    return (
        < div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <h1>Quick Recipe Finder App</h1>
            <section style={{textAlign:"center",color:"white"}}>Powered by <a href="https://www.themealdb.com/" style={{color:"darkgreen",fontWeight:"bold"}}>TheMealDB</a></section>
            <SearchBar value={query} onChange={setQuery} />
            <FilterRecipe
                value={filterValue}
                onChange={setFilterValue}
                recipesArray={recipes}
                filterKey={"strArea"}
                defaultValue={areaDef} />

            {isLoading &&
            <div className="recipe-grid">
                    {Array.from({ length: 13 }).map((_, i) => <SkeletonCard key={i}/>)}
            </div>
            }
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
            <RecipeCard
                key={recipe.idMeal}
                recipe={recipe}
                filterDefaultValue={areaDef}
                filterValue={filterValue}
                //.some() to check if the current recipe is in favorites
                isFavorite={favorites.some(r => r.idMeal === recipe.idMeal)}  
                onFavorite={toggleFavorite}
            />
        ))}
                
                
        </div>


        {/* console.log({recipes}); */}
        </div>
    )

}