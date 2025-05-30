import { useState, useEffect } from 'react';
import { months } from '../data/data.js';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingIcon from '../components/loadingIcon.jsx';

import { useTaskMethod } from '../utils/taskController.js';

const ViewTask = () => {
  const { id } = useParams();
  const urlParams = new URLSearchParams(window.location.search);
  const edit = JSON.parse(urlParams.get("edit")) || false;

  const [data, setData] = useState(null);
  const [isServerSideOK, setIsServerSideOK] = useState(false);
  const [isEditing, setIsEditing] = useState(edit);
  const [taskDesc, setTaskDesc] = useState("");
  const [isPinned, setIsPinned] = useState(data?.pin || false);
  const [isComplete, setIsComplete] = useState(data?.status === "Complete" || false);
  const { getOne, pin, fetch, unpin, remove, update } = useTaskMethod();
  const nav = useNavigate();



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

  const openEdit = () => {
    setIsEditing(true);
    if (document.getElementById("textarea")) {
      document.getElementById("textarea").disabled = false;
      document.getElementById("textarea").focus();
    }
  }

  const getData = async () => {
    const res = await getOne({ _id: id });

    if (res) {
      const info = res.info[0]
      setData(info);
      setTaskDesc(info.task);
      setIsPinned(info.pin)
      setIsComplete((info.status === "Complete"))
      if (edit) {
        openEdit();
      }
      setIsServerSideOK(true);
    }
  }

  useEffect(() => {
    getData();
  }, [id]);

  if (!isServerSideOK) {
    return <LoadingIcon />
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

  const deactivateTextarea = () => {
    document.getElementById("textarea").disabled = true;
    document.getElementById("textarea").blur();
  }

  const closeEdit = () => {
    setIsEditing(false);
    setTaskDesc(data.task);
    deactivateTextarea();
  }

  const handleUpdateTask = async () => {
    const res = await update({ body: { task: taskDesc }, _id: data._id });
    setIsEditing(false);
    deactivateTextarea();
  }

  const settings = [
    {
      label: isEditing ? "Cancel" : "Edit",
      fn: isEditing ? closeEdit : openEdit
    }, {
      label: isPinned ? "Unpin" : "Pin",
      fn: isPinned ? handleUnpin : handlePin
    }, {
      label: "Delete",
      fn: handleRemove
    }
  ]

  const [year, month, date] = data.createdAt.split("T")[0].split("-").map(Number);
  const [uYear, uMonth, uDate] = data.updatedAt.split("T")[0].split("-").map(Number);

  return <div className="w-11/12 text-left">
    <div className="flex gap-4 my-2">
      <p className="text-black/60" >Status: {data.status}</p>
      {
        (isComplete || data.status === "Complete") ? <button className="text-black/80 text-xs" onClick={handleSetIncompleted}>Mark as incomplete</button> : <button className="text-black/80 text-xs" onClick={handleSetCompleted}>Mark as complete</button>
      }
    </div>
    <div className="bg-gradient-to-br from-green-100/50 to-amber-400/20 p-2 wrap rounded-2xl w-full">
      <div className="flex  text-sm items-center w-full justify-between">
        <p className="text-black/50">Task Description</p>
        <button onClick={handleUpdateTask} disabled={!isEditing} className={`px-2 ${(taskDesc === data.task || taskDesc.length === 0) ? "text-black/50" : "text-black"}`} >{isEditing ? "Save" : null}</button>
      </div>
      <textarea onChange={(e) => setTaskDesc(e.target.value)} id="textarea" disabled={!edit} readonly={!isEditing || !edit} className="p-2 outline-none w-full" value={taskDesc} />
      <div className="flex  gap-3 my-2 items-center">
        {
          settings.map(({ label, fn }) => <button onClick={() => fn(data)} className="text-sm last:text-red-400 text-black/80">
            {label}
          </button>)
        }
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex text-xs text-black/50 gap-2 items-center">
          <p className="text-black/80">Created: </p>
          <p>{`${months[month - 1]} ${date}, ${year}`}</p>
        </div>
        <div className="flex text-xs text-black/50 gap-2 items-center">
          <p className="text-black/80">Last updated:</p>
          <p>{`${months[uMonth - 1]} ${uDate}, ${uYear}`}</p>
        </div>
      </div>
    </div>
  </div>

}

export default ViewTask