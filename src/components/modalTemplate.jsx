 import { motion } from 'framer-motion';
import { fade } from '../variants/variant.js'
import {  useEffect } from 'react';

const Modal = ({children, onClose = null}) => {
  
  useEffect(() => {
    document.body.style.overflow = "hidden" 
    return()=>{
      document.body.style.overflow = "" 
    }
  }, [])

return <motion.div
variants = {fade} initial = "hidden" animate = "visible" exit = "hidden" onClick = {onClose === null ? (e) => e.stopPropagation() : onClose}  className = "flex flex-col justify-center fixed inset-0 bg-black/65 items-center">
  {children}
  </motion.div>
}

export default Modal