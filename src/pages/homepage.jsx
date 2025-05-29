import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import Task from '../components/task.jsx';
import { NavLink } from 'react-router-dom';
import { setTasks, setPinnedTasks } from '../state/taskSlice.js';
import { useTaskMethod } from '../utils/taskController.js';
import CircleButton from '../components/circleButton.jsx';
import TaskList from '../components/taskList.jsx';
const Homepage = () => {
  const { tasks, totalTasks, pinnedTasks } = useSelector(state => state.tasks);
  const [loading, setLoading] = useState(false);
  const [isCompleteHidden, setIsCompleteHidden] = useState(JSON.parse(localStorage.getItem("Complete-Hidden")));
  const dispatch = useDispatch();
  const { fetch, fetchIncomplete} = useTaskMethod();

  const getTasks = async () => {
    try {
      setLoading(true);
      await fetch();
      setLoading(false);
    } catch (e) {
    }
  }
  
  const handleChange = () => {
    setIsCompleteHidden(prev => {
      const upd = !prev; 
      localStorage.setItem("Complete-Hidden", JSON.stringify(upd));
      return upd;
    });
    window.location.reload();
    
  }
  
  const hideCompletedTasks = async() => {
    try {
      setLoading(true);
      await fetchIncomplete();
      setLoading(false);
    } catch (e) {

    }
  }

  useEffect(() => {
      if(isCompleteHidden){
        hideCompletedTasks(); 
        return;
      }else{
        getTasks();
      }
  }, [isCompleteHidden, dispatch])

  return <div className="w-full flex flex-col justify-center items-center  pb-8">
    <CircleButton disabled ={loading} isOn = {isCompleteHidden} setIsOn = {handleChange} label = "Hide comepleted tasks"/>
    <div className = "flex flex-col gap-3 justify-center items-center w-full">
          <TaskList loading = {loading} list={pinnedTasks} label = "Pinned Tasks"/>
    <TaskList loading = {loading} list={tasks} />
    </div>
  </div>

}

export default Homepage