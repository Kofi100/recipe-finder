import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
    <div className="p-4">
      <h1>{recipe.strMeal}</h1>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <p><strong>Category:</strong> {recipe.strCategory}</p>
      <p><strong>Instructions:</strong> {recipe.strInstructions}</p>
      <a href={recipe.strYoutube} target="_blank" rel="noreferrer">Watch on YouTube</a>
    </div>
  );
}
