import { useState, useEffect } from 'react';
import { NavLink, useSearchParams, useNavigate } from 'react-router-dom';
import kikiIcon from '/kikiIcon.png'

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const nav = useNavigate();
  const [searchQuery, setSearchQuery] = useSearchParams("");
  const handleNavigate = () => {
    
      setSearchQuery({ q: query})
      nav(`/search/?q=${query}`)
  
  }
  
return <div className = 'inset-y-0 p-2 w-11/12 top-0 sticky flex flex-col  text-white'>
  <div className = "flex w-full items-center rounded-lg overflow-hidden outline">
    <input onChange = {(e) => setQuery(e.target.value)} placeholder = 'Look for tasks' className = "w-full placeholder-black/60 p-2 bg-neutral-amber-50 outline-none text-black" /> 
    <button onClick = {handleNavigate} disabled = {query.length === 0} className = "p-2 active:bg-amber-700 bg-gradient-to-tr from-amber-700/60 to-amber-900/60 text-white">Searchh!</button>
  </div>
</div>

}

export default SearchBar