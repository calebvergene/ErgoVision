'use client'

import { motion } from 'framer-motion'
import { useContext } from 'react'
import { ContentContext } from '../content'

const ProgressIndicator = () => {
  const { fastapiResponse } = useContext(ContentContext)

  const location = Number(fastapiResponse?.video_reba_score.toFixed(2)) || 0

  return (
    <motion.div
      className="absolute z-[2] h-full w-1 rounded-md"
      style={{
        backgroundImage:
          'linear-gradient(to bottom, black 50%, transparent 50%)',
        backgroundSize: '1px 10px',
      }}
      animate={{
        left: `${(location / 8) * 100}%`,
      }}
      transition={{ duration: 1 }}
    >
      <div className="absolute bottom-0 left-1/2 mx-auto flex h-8 w-10 -translate-x-1/2 items-center justify-center rounded-full px-2 bg-[#085E69] text-white">
        {location}
      </div>
    </motion.div>
  )
}

export default ProgressIndicator
