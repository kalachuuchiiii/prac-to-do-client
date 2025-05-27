import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import kikiIcon from '/kikiIcon.png'

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
return <div className = 'inset-y-0 p-2 w-11/12 top-0 sticky flex flex-col  text-white'>
  <div className = "flex w-full items-center rounded-lg overflow-hidden outline">
    <input onChange = {e => setSearchQuery(e.target.value)} value = {searchQuery} placeholder = 'Look for tasks' className = "w-full p-2 bg-neutral-amber-50 outline-none text-black" /> 
    <NavLink to = {`/search/?desc=${searchQuery}`} disabled = {searchQuery.length === 0} className = "p-2 active:bg-amber-700 bg-gradient-to-tr from-amber-700/60 to-amber-900/60 text-white">Searchh!</NavLink>
  </div>
</div>

}

export default SearchBar