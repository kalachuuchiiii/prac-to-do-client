import { months } from '../data/data.js';
import { useSelector, useDispatch } from 'react-redux';
import { setTasks, setPinnedTasks } from '../state/taskSlice.js'
import { AnimatePresence } from 'framer-motion';
import Modal from '../components/modalTemplate.jsx';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchAPI } from '../utils/fetch.js';
import CircleButton from '../components/circleButton.jsx';
import { BsThreeDotsVertical } from "react-icons/bs";
import { useTaskMethod } from '../utils/taskController.js';

const Task = ({ task = null }) => {
  const [status, setStatus] = useState(task?.status);
  const { tasks, pinnedTasks } = useSelector(state => state.tasks);
  const { pin, unpin, remove } = useTaskMethod();
  const dispatch = useDispatch();
  const [isServerBusy, setIsServerBusy] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [year, month, date] = task?.createdAt?.split("T")[0].split("-").map(Number);

  const updStatus = async (upd) => {
    await fetchAPI("patch", "update-task", { update: { status: upd }, _id: task?._id });
    if (task?.pin) {
      const f = pinnedTasks.map((t) => t._id === task._id ? { ...t, status: upd } : t);
      dispatch(setPinnedTasks({ pinnedTasks: f }))
      return;
    }
    const f = tasks.map((t) => t._id === task._id ? { ...t, status: upd } : t);
    dispatch(setTasks({ tasks: f }))
  }

  const handleChange = async () => {
    setStatus(prev => {
      const upd = prev === "Ongoing" ? "Complete" : "Ongoing";
      updStatus(upd)
      return upd;
    });
  }
  
  const handlePin = async() => {
    
    await pin(task);
    setIsModalOpen(false);
  }
  const handleUnpin = async() => {
    await unpin(task)
    setIsModalOpen(false);
  }
  
  const handleRemove = async() => {
    await remove(task)
    setIsModalOpen(false);
  }
  

  return <div className="grid ">
    <AnimatePresence>
      {
        isModalOpen && <Modal onClose = {() => setIsModalOpen(false)}>
          <div onClick = {e => e.stopPropagation()} className = "bg-gradient-to-br from-green-100/70  to-amber-400/40 overflow-hidden rounded-2xl w-11/12 flex flex-col h-[20vh] justify-evenly items-center">
            <NavLink to = {`/task/${task._id}?edit=true`}>Edit task</NavLink>
            <button onClick = {task.pin ? handleUnpin : handlePin}>{task.pin ? "Unpin task" : "Pin Task"}</button>
            <button className = "text-red-500" onClick = {handleRemove}>Delete task</button>
          </div>
        </Modal>
      }
    </AnimatePresence>
    {
      status === "Complete" && <p className=" w-full row-start-1 col-start-1  pointer-events-none items-center flex justify-start p-2 text-green-100 z-10">Completed</p>
    }
    <div className={`grid row-start-1 col-start-1 grid-cols grid-cols-10 p-3 border-b-1 border-b-green-100 bg-gradient-to-r transition-colors duration-200 w-full ${status === "Complete" ? " from-black/80 to-black/30" : "from-transparent to-transparent"}`}>
      <button disabled = {task.status === "Complete"} onClick={() => setIsModalOpen(prev => !prev)} className="col-start-1">      <BsThreeDotsVertical /></button>

      <NavLink to = {`/task/${task._id}`} className="col-span-6 col-start-2">
        <p className="truncate">{task.task}</p>
        <p className="text-xs  text-black/50">{`${months[month - 1]} ${date}, ${year}`}</p>
      </NavLink>
      <button  className="col-span-3 flex justify-center ">
        <CircleButton disabled={isServerBusy} isOn={status === "Complete"} setIsOn={handleChange} />
      </button>
    </div>

  </div>

}

export default Task