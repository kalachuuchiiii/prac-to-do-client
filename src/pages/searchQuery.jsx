import TaskList from '../components/taskList.jsx';
import { useState, useEffect } from 'react';
import { fetchAPI } from '../utils/fetch.js';
import { useSearchParams } from 'react-router-dom';
const SearchResults = () => {
  const [results, setResults] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [searchQuery] = useSearchParams();
  const query = searchQuery.get("q")
  
  const getResults = async(keyword) => {
    try{
      const filter = {
        filters: JSON.stringify({ task: { 
        $regex: keyword, 
        $options: "i"
      }})
      }
      setLoading(true);
          const res = await fetchAPI("get", "filter-task", filter);
          if(res){
            setResults(res.info); 
            setLoading(false);
          }
        }catch(e){
          console.log("result", e)
        }
  }
  
  useEffect(() => {
    getResults(query)
  }, [query])


return <div className = "flex w-full flex-col justify-center items-center gap-4">
  <p className = "text-black/50 text-sm">Search results for "{query}"</p>
  <TaskList loading = {loading} label = "Results" list = {results} />
</div>

}

export default SearchResults