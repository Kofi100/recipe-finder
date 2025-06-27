const SPOON_API_URL = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY =import.meta.env.VITE_SPOON_KEY;
export async function fetchSpoonRecipes(query) {
   const response = await fetch(`${SPOON_API_URL}?query=${query}&number=12&apiKey=${API_KEY}`);
  const data = await response.json();
  // console.log(data.results);
  // console.log(API_KEY);
  
  return data.results || [];


}