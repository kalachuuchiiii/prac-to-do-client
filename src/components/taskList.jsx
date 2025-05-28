import Task from './task.jsx';
import { NavLink } from 'react-router-dom';

const TaskList = ({ loading = false, list = [], label = "Tasks"}) => {
  return <div className = "bg-gradient-to-br from-green-100/50 to-amber-400/20 overflow-hidden rounded-2xl w-11/12 pb-4">
    <div className = "grid grid-cols-4 w-full text-black/50 text-sm px-3 pt-3">
          <p className = "col-span-3 ">{loading ? "Loading..." : label}</p>
          <p className = "col-start-4 text-center">Complete</p>
    </div>
    <div className = "w-full">
        {
    list.length > 0 && list.map((task) => <Task task = {task} /> )
  }
    </div>
  </div>




}

export default TaskList