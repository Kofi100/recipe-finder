// import {  } from "module";
import { Link } from 'react-router-dom';
export default function RecipeCard({ recipe }) {
    return (
        <Link to={`/recipe/${recipe.idMeal}`} key={recipe.idMeal} className="recipe-grid__item">
            <section className="recipe-grid__item__headings">
            <h2>{recipe.strMeal}</h2>
            <section>{recipe.strArea}</section>
            </section>
            <img src={recipe.strMealThumb} alt={recipe.strMeal}
                style={{ aspectRatio: 4 / 3 }} />
            
            {/* only show if recipe.strYouTube exists */}
            <p className="recipe-grid__item__links">
            {
                recipe.strYoutube&&(
                    <a href={recipe.strYoutube}>Watch on YouTube</a>
                )
            }

            {
                recipe.strSource && (
                    <a href={recipe.strSource}>Cook along here</a>
                )
            }
            </p>
        
        </Link>
    )
}