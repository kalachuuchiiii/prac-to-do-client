  import LoadingIcon from '../components/loadingIcon.jsx';
  import { motion } from 'framer-motion';
  import { fade } from '../variants/variant.js';
  const LoadingModal = () => {
  
  return <motion.div variants = {fade} initial = "hidden" aninate = "visible" exit = "hidden" onClick = {e => e.stopPropagation()} className = "flex flex-col justify-center fixed inset-0 bg-black/60 items-center">
    <LoadingIcon label = "Creating"/>
  </motion.div>
  
  }
  
  export default LoadingModal