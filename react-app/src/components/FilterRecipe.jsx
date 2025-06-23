export default function FilterRecipe({ value, onChange, recipesArray,filterKey="strArea",defaultValue}) {
  // Extract unique areas
    const areaArray = Array.from(
        new Set(recipesArray.map((recipe) => recipe[filterKey]).filter(Boolean))
  );

  return (
    <>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
              <option value={defaultValue}>{defaultValue}</option>
        {areaArray.map((area) => (
          <option key={area} value={area}>
            {area}
          </option>
        ))}
      </select>
    </>
  );
}
