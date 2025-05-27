import kikiIcon from '/kikiIcon.png';

const LoadingIcon = ({label = "Loading"}) => {

return <div className = " size-50 bg-gradient-to-br from-green-100/50 p-4 to-amber-900/20 flex flex-col justify-center  rounded">
  <img src = {kikiIcon} className = "object-cover"/>
  <p className = "text-xs text-white text-center">{label}...</p>
</div>

}

export default LoadingIcon