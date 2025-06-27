// import {  } from "module";
import { Link } from 'react-router-dom';
import { useState } from "react";

export default function RecipeCard({ recipe, filterDefaultValue,filterValue,isFavorite,onFavorite}) {
    const [clicked, setClicked] = useState(false);
    const shouldRender = filterValue === filterDefaultValue || recipe.strArea === filterValue;
    
    
    if (!shouldRender) {
        return null;
    }
   
        return (
            <div key={recipe.idMeal} className="recipe-grid__item">
            <section style={{    display:"flex",alignItems:"center",columnGap: "16px"}}>
            <section className="recipe-grid__item__headings">
                <h2>{recipe.strMeal}</h2>
                <section>{recipe.strArea}</section>
                    </section>
            <section>
                <button onClick={() =>{
                            onFavorite(recipe);
                            setClicked(true);
                            setTimeout(() => setClicked(false), 300);
                        }}
                        //set className to heart-btn animated if clicked else heart-btn
                className={`heart-btn ${clicked ? 'animate' : ''}`}
                style={{border:"none"}}        
                        >
                 {isFavorite ? '💖' : '🤍'}
                        </button>
                        
            </section>
            </section>
            <Link to={`/recipe/${recipe.idMeal}/${recipe.isSpoonacular ? 'spoon' : 'themeal'}`}>
            <img src={recipe.strMealThumb} alt={recipe.strMeal}
                style={{ aspectRatio: 4 / 3 }} />
            </Link>
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
        
        </div>
    )}
