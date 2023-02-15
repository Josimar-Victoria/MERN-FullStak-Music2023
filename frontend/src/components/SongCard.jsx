import React from 'react'
import { motion } from 'framer-motion'
import { MdDelete } from 'react-icons/md'

function SongCard ({ data, i }) {
  return (
    <motion.div className='relative w-40 min-w-210 px-2 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center'>
      <div className='w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden'>
        <motion.img
          src={data?.imageURL}
          alt='ImgeUrl'
          className='h-full w-full rounded-lg object-cover'
        />
      </div>
      <p className='text-base text-black font-semibold my-2'>
        {data?.name.length > 25 ? `${data?.name.slice(0, 25)}...` : data?.name}
        <span className='block text-sm text-black my-1'>
          {data?.artist.length > 25
            ? `${data?.artist.slice(0, 25)}...`
            : data?.artist}
        </span>
      </p>
      <div className='w-full absolute bottom-2 right-2 flex items-center justify-between px-4'>
        <motion.i
          whileTap={{ scale: 0.75 }}
          className='text-base text-red-400 drop-shadow-md hover:text-red-600'
        >
          <MdDelete className='text-xl' />
        </motion.i>
      </div>
    </motion.div>
  )
}

export default SongCard
