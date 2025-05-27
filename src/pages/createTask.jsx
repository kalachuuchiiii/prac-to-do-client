import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchAPI } from '../utils/fetch.js';
import CircleButton from '../components/circleButton.jsx';
import { AnimatePresence } from 'framer-motion';
import LoadingModal from '../components/loadingModal.jsx';


const CreateTask = () => {
  const [desc, setDesc] = useState(localStorage.getItem("task") || "");
  const [isPinned, setIsPinned] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const [loading, setLoading] = useState(false);
  const textRef = useRef(null);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await fetchAPI("post", "create-task", { task: desc, pin: isPinned });
      setDesc("");
      setPlaceholder("Successfully Created!")
      setTimeout(() => {
        setPlaceholder("");
      }, 1000)
      setLoading(false);
    } catch (e) {

    }
  }

  useEffect(() => {
    const ref = textRef.current;
    if (!ref) return;
    ref.style.height = "auto"
    ref.style.height = `${ref.scrollHeight}px`;
    localStorage.setItem("task", desc);
  }, [desc])

  return <div className="flex w-11/12 flex-col  items-center gap-2 items-center justify-center ">
    <AnimatePresence>
      {
        loading && <LoadingModal />
      }
    </AnimatePresence>
    <div className="w-full bg-gradient-to-br from-green-100/50 to-amber-400/20  pb-6 px-4 rounded-lg">
      <div className="p-2">
        <p className="text-lg ">Describe your task</p>
        <p className="text-xs">What do you need to get done here?</p>
      </div>
      <CircleButton isOn={isPinned} setIsOn={() => setIsPinned(prev => !prev)} label="Pin" />
      <textarea placeholder = {placeholder} rows="13" onChange={e => setDesc(e.target.value)} value={desc} ref={textRef} className="outline-1 placeholder-amber-900/50 ml-2 w-full outline-amber-900/50 p-2 rounded-lg" />
    </div>
    <div className="w-11/12 flex gap-1 ">
      <NavLink to="/" className="p-2 text-center w-full rounded  bg-green-100/50">Cancel</NavLink>
      <button onClick={handleSubmit} disabled={desc.length <= 0} className={`w-full transition-colors duration-200  p-2 rounded text-white ${desc.length > 0 ? "bg-amber-900/85" : "bg-amber-900/50"}`}>
        Create
      </button>
    </div>

  </div>

}

export default CreateTask