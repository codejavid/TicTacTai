import React from 'react'
import { motion } from 'framer-motion'

const Square = ({value,onClick}) => {

  return (
    <motion.button 
    className='w-[90px] h-[90px] bg-[#1E293B] flex font-bold text-4xl 
    items-center justify-center'
    whileTap={{scale:0.9}}
    onClick={onClick}>
        {value}
    </motion.button>
  )
}

export default Square