const CircleButton = ({isOn, setIsOn, disabled = false, label = null}) => {

return    <button disabled = {disabled} onClick = {setIsOn} className = "ml-2 pb-2 flex gap-1 items-center text-sm">
      <div className = {`size-3 transition-colors duration-200 rounded-full ${ isOn ? "bg-amber-800" : "bg-transparent outline outline-amber-900"}`}></div>
      <p>{label}</p>
    </button>

}

export default CircleButton