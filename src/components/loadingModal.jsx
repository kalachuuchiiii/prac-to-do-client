  import LoadingIcon from '../components/loadingIcon.jsx';
  import Modal from '../components/modalTemplate.jsx'
  import { motion } from 'framer-motion';
  import { fade } from '../variants/variant.js';
  const LoadingModal = () => {
  
  return <Modal>
        <LoadingIcon label = "Creating"/>
  </Modal>
  
  }
  
  export default LoadingModal