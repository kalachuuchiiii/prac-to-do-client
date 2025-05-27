import { months } from '../data/data.js';
import { useSelector, useDispatch } from 'react-redux';
import { setTasks, setPinnedTasks } from '../state/taskSlice.js'
import { useState, useEffect } from 'react';
import { fetchAPI } from '../utils/fetch.js';
import CircleButton from '../components/circleButton.jsx';

const Task = ({task = null}) => {
  const [status, setStatus] = useState(task?.status ); 
  const { tasks, pinnedTasks } = useSelector(state => state.tasks);
  const dispatch = useDispatch();
  const [isServerBusy, setIsServerBusy] = useState(false);
  
  const [year, month, date] = task?.createdAt?.split("T")[0].split("-").map(Number);
  
  const updStatus = async(upd) => {
    await fetchAPI("patch", "update-task", { update: {status:upd}, _id: task?._id });
    if(task?.pin){
      const f = pinnedTasks.map((t) => t._id === task._id ? {...t, status: upd} : t);
      dispatch(setPinnedTasks({pinnedTasks: f}))
      return;
    }
    const f = tasks.map((t) => t._id === task._id ? {...t, status: upd} : t);
      dispatch(setTasks({tasks: f}))
  }
  
  const handleChange = async() => {
    setStatus(prev => {
      const upd = prev === "Ongoing" ? "Complete" : "Ongoing"; 
      updStatus(upd)
      return upd;
    });
  }
  
  

  
return <div className = "grid ">
      {
      status === "Complete" && <p className = " w-full row-start-1 col-start-1  pointer-events-none items-center flex justify-start p-2 text-green-100 z-10">Completed</p>
    }
  <div className = {`grid row-start-1 col-start-1 grid-cols grid-cols-4 p-3 border-b-1 border-b-green-100 bg-gradient-to-r transition-colors duration-200 w-full ${status === "Complete" ? " from-black/80 to-black/30" : "from-transparent to-transparent"}`}>
      <div className = "col-span-3">
        <p className = "truncate">{task.task}</p>
        <p className = "text-xs  text-black/50">{`${months[month]} ${date}, ${year}`}</p>
      </div>
      <button className = "col-span-1 flex justify-center ">
              <CircleButton disabled = {isServerBusy} isOn = {status === "Complete"} setIsOn = {handleChange} />
      </button>
    </div>

</div>

}

export default Task