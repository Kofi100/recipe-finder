import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SentenceList from '../components/SentenceList';
import './styles/RecipeDetail.css';

export default function RecipeDetail() {
  const { id, isSpoon } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        if (isSpoon === "spoon") {
          const SPOON_KEY = import.meta.env.VITE_SPOON_KEY;
          const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${SPOON_KEY}`);
          const data = await res.json();

          setRecipe({
            idMeal: `spoon-${data.id}`,
            strMeal: data.title,
            strMealThumb: data.image,
            strArea: data.cuisines?.[0] || "Unknown",
            strCategory: data.dishTypes?.[0] || "Unknown",
            strInstructions: data.instructions || "No instructions provided.",
            strSource: data.sourceUrl,
            strYoutube: null,
            ingredients: data.extendedIngredients.map(i => ({
              ingredient: i.name,
              measure: `${i.amount} ${i.unit}`
            }))
          });
        } else {
          const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
          const data = await res.json();
          const meal = data.meals?.[0] || null;

          const ingredients = Array.from({ length: 20 }, (_, index) => {
            const name = meal[`strIngredient${index + 1}`];
            const measure = meal[`strMeasure${index + 1}`];
            return name ? { ingredient: name, measure } : null;
          }).filter(Boolean);

          setRecipe({ ...meal, ingredients });
        }
      } catch (error) {
        console.error("Failed to fetch recipe:", error);
      }
    }

    fetchRecipe();
    //code below means update effect if id,isSpoon changes
  }, [id, isSpoon]);

  //custom sentence casing Function to change char @index 0 to Uppercase and chars from index 1 going to Lowercase.
  function sentenceCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  
  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="p-4" style={{ textAlign: "start" }}>
      <h1>{recipe.strMeal}</h1>
      <h2 className='recipeDetail--h2'>{recipe.strArea}</h2>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <p><strong>Category:</strong> {String(recipe.strCategory).charAt(0).toUpperCase()+String(recipe.strCategory).slice(1).toLowerCase()}</p>

      {recipe.strYoutube && (
        <a href={recipe.strYoutube} target="_blank" rel="noreferrer">Watch on YouTube</a>
      )}
      <br />
      {recipe.strSource && (
        <a href={recipe.strSource} target="_blank" rel="noreferrer">Read and Cook Along here</a>
      )}

      <p><strong>Ingredients:</strong></p>
      <ol style={{ display: 'grid' }}>
        {recipe.ingredients.map((item, i) => (
          <div key={i} style={{ display: "flex", columnGap: 16 }}>
            <li>{sentenceCase(item.ingredient)}</li>
            <section>({sentenceCase(item.measure)})</section>
          </div>
        ))}
      </ol>

      <p><strong>Instructions:</strong></p>
      <SentenceList text={recipe.strInstructions} />
    </div>
  );
}
