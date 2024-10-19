'use client'

import { motion } from 'framer-motion'
import React from 'react'

const ProgressIndicator = () => {
  const [location, setLocation] = React.useState<number>(2)
  return (
    <motion.div
      className="absolute z-10 h-full w-1 rounded-md"
      style={{
        backgroundImage:
          'linear-gradient(to bottom, black 50%, transparent 50%)',
        backgroundSize: '1px 10px',
      }}
      animate={{ left: `${(location / 8) * 100}%` }}
      transition={{ duration: 1 }}
    >
      <div className="absolute bottom-0 left-1/2 mx-auto flex h-8 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-[#0161E8] text-white">
        {location}
      </div>
    </motion.div>
  )
}

export default ProgressIndicator
