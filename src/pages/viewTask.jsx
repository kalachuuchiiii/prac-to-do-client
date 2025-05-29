import { useState, useEffect } from 'react';
import { months } from '../data/data.js';
import { useParams, useNavigate } from 'react-router-dom';

import { useTaskMethod } from '../utils/taskController.js';

const ViewTask = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isServerSideOK, setIsServerSideOK] = useState(false);
  const [isPinned, setIsPinned] = useState(data?.pin || false);
  const [isComplete, setIsComplete] = useState(data?.status === "Complete" || false);
  const { getOne, pin, fetch, unpin, remove, update } = useTaskMethod();
  const nav = useNavigate();

  const getData = async () => {
    const res = await getOne({ _id: id });

    if (res) {
      const info = res.info[0]
      setData(info);
      setIsPinned(info.pin)
      setIsComplete((info.status === "Complete"))

      setIsServerSideOK(true);
    }
  }

  const handleSetCompleted = async () => {
    await update({ body: { status: "Complete" }, _id: data._id });
    setData(prev => ({ ...prev, status: "Complete" }));
     await fetch();
    setIsComplete(true);
  }
  const handleSetIncompleted = async () => {
    await update({ body: { status: "Ongoing" }, _id: data._id });
    setData(prev => ({ ...prev, status: "Ongoing" }))
    await fetch();
    setIsComplete(false);

  }



  useEffect(() => {
    getData();
  }, [id]);

  if (!isServerSideOK) {
    return <></>
  }

  const handleRemove = async (data) => {
    await remove(data);
    nav("/")
  
}

const handlePin = async (data) => {
  await pin(data);
  setIsPinned(true);
}
const handleUnpin = async (data) => {
  await unpin(data);
  setIsPinned(false);
}

const settings = [
  {
    label: "Edit",
    fn: null
  }, {
    label: isPinned ? "Unpin" : "Pin",
    fn: isPinned ? handleUnpin : handlePin
  }, {
    label: "Delete",
    fn: handleRemove
  }
]

const [year, month, date] = data.createdAt.split("T")[0].split("-").map(Number);

return <div className="w-11/12 text-left">
  <div className="flex gap-4 my-2">
    <p className="text-black/60" >Status: {data.status}</p>
    {
      (isComplete || data.status === "Complete") ? <button className="text-black/80 text-xs" onClick={handleSetIncompleted}>Mark as incomplete</button> : <button className="text-black/80 text-xs" onClick={handleSetCompleted}>Mark as complete</button>
    }
  </div>
  <div className="bg-gradient-to-br from-green-100/50 to-amber-400/20 p-2 wrap rounded-2xl w-full">
    <p className="text-sm text-black/50">Task Description</p>
    <p className=" text-base text-balance break-words my-4 ml-2">{data.task}</p>
    <p className="text-sm text-black/50">{`${months[month - 1]} ${date}, ${year}`}</p>
    <div className="flex gap-3 my-2 items-center">
      {
        settings.map(({ label, fn }) => <button onClick={() => fn(data)} className="text-sm text-black/80">
          {label}
        </button>)
      }
    </div>
  </div>
</div>

}

export default ViewTask