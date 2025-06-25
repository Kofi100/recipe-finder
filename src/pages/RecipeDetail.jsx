import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SentenceList from '../components/SentenceList';
import './styles/RecipeDetail.css'
export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await res.json();
      setRecipe(data.meals?.[0] || null);
    }
    fetchRecipe();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="p-4" style={{textAlign:"start"}}>
          <h1>{recipe.strMeal}</h1>
          <h2 className='recipeDetail--h2'>{recipe.strArea}</h2>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <p><strong>Category:</strong> {recipe.strCategory}</p>
        {recipe.strYoutube &&
              <a href={recipe.strYoutube} target="_blank" rel="noreferrer">Watch on YouTube</a>
          }
        <br />

      {recipe.strSource&&
              <a href={recipe.strSource} target="_blank" rel="noreferrer">Read and Cook Along here</a>
          }
        
          <p><strong>Ingredients:</strong></p> 
          <ol style={{display:'grid'}}>
              {/* { 
             for (let index = 1; index < 20; index++) {
                // const element = array[index];
               var string=strIngredient+index;
              }
              } */}
              {
                  Array.from({ length: 20 }, (_, index) => {
                      const key = `strIngredient${index + 1}`
                      const key2 = `strMeasure${index + 1}`
                      const ingredient = recipe[key];
                      const measure = recipe[key2];
                     
                      return ingredient ? (
                          <div key={key} style={{ display: "flex",columnGap:16}}>
                              <li key={key} >{ingredient}</li>
                              <section key={key2}>({measure})</section>
                          </div>
                      ) : (null);
                  })
              }
              {/* <li>{ recipe.strIngredient1}</li>
              <li></li>
              <li></li>
              <li></li>
              <li></li> */}
          </ol>
          <p><strong>Instructions:</strong> </p>
          <SentenceList text={recipe.strInstructions} />
          

    </div>
  );
}
