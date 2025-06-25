const API_URL = "https://www.themealdb.com/api/json/v1/1";

export async function fetchRecipes(query) {
  const res = await fetch(`${API_URL}/search.php?s=${query}`);
  const data = await res.json();
  return data.meals || [];
}