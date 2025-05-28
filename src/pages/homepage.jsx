import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useLayoutEffect } from 'react';
import Task from '../components/task.jsx';
import { NavLink } from 'react-router-dom';
import { setTasks, setPinnedTasks } from '../state/taskSlice.js';
import { fetchAPI } from '../utils/fetch.js';
import TaskList from '../components/taskList.jsx';
const Homepage = () => {
  const { tasks, totalTasks, pinnedTasks } = useSelector(state => state.tasks);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getTasks = async () => {
    try {
      setLoading(true);
      const filter = {
        filters: JSON.stringify([{ pin: true }, { pin: false }])
      }
      const res = await fetchAPI("get", "filter-task", filter);
      if (res) {
        dispatch(setPinnedTasks({ pinnedTasks: res.info[0].data }))
        dispatch(setTasks({ tasks: res.info[1].data }))
      }
      setLoading(false);
    } catch (e) {

    }
  }

  useLayoutEffect(() => {
    
      getTasks();
  }, [])

  return <div className="w-full flex flex-col justify-center items-center gap-3 pb-8">
    <TaskList list={pinnedTasks} label = "Pinned Tasks"/>
    <TaskList loading = {loading} list={tasks} />
  </div>

}

export default Homepage