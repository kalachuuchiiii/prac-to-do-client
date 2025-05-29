import { useSelector, useDispatch } from 'react-redux';
import { setTasks, setPinnedTasks } from '../state/taskSlice.js'
import { fetchAPI } from '../utils/fetch.js';

export const useTaskMethod = () => {
  const dispatch = useDispatch();

const fetchTasks = async() => {
    const filter = {
        filters: JSON.stringify([{ pin: true }, { pin: false }])
      }
      
      const res = await fetchAPI("get", "filter-task", filter);
      if (res) {
        dispatch(setPinnedTasks({ pinnedTasks: res.info[0].data }))
        dispatch(setTasks({ tasks: res.info[1].data }))
  }
  }
  
  const handlePinTask = async(task) => {
    if(task.pin)return;
    await fetchAPI("patch", "update-task", { update: {pin:true}, 
      _id: task._id
    })
    fetchTasks()
  }
  
  const handleUnpinTask = async(task) => {
    if(!task.pin)return;
    await fetchAPI("patch", "update-task", { update: {pin:false}, 
      _id: task._id
    })
    fetchTasks();
  }
  
  const handleRemoveTask = async(task) => {
    await fetchAPI("delete", `delete-task/${task._id}`, {})
    fetchTasks();
  }
  
  const getSingleTask = async(task) => {
  const filters = JSON.stringify({_id: task._id})
   const res = await fetchAPI("get", "filter-task", {
      filters
    })
    return res;
  }
  
  const handleUpdateTask = async(upd) => {
    const res = await fetchAPI("patch", "update-task", { 
      update: upd.body, 
      _id: upd._id
    })
    return res;
  }
  
  const fetchIncomplete = async() => {
    const filter = {
        filters: JSON.stringify([{ pin: true, status: "Ongoing"}, { pin: false, status: "Ongoing"}])
      }
      
      const res = await fetchAPI("get", "filter-task", filter);
      if (res) {
        dispatch(setPinnedTasks({ pinnedTasks: res.info[0].data }))
        dispatch(setTasks({ tasks: res.info[1].data }))
  }
  }
  
  
  return {
    fetch: fetchTasks,
    fetchIncomplete: fetchIncomplete,
    pin: handlePinTask,
    unpin: handleUnpinTask,
    remove: handleRemoveTask,
    getOne: getSingleTask,
    update: handleUpdateTask
  }
  
}
