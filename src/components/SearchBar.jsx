export default function SearchBar({value,onChange}){
    return (
    <>
        <input type="search" name="search" id="searchBar"
                placeholder="Search for any recipe.."
                value={value}
                onChange={e => onChange(e.target.value)}
                style={{minWidth:"85%",minHeight:"3rem",paddingLeft:"1rem"}}
        />
    
    </>)
}