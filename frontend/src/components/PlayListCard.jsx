import React, { useEffect, useState } from 'react'
import { getAllSongs } from '../api'
import { actionTypes } from '../context/reducer'
import { useStateValue } from '../context/StateProvider'
import { motion } from 'framer-motion'
import { IoMusicalNote } from 'react-icons/io5'

function PlayListCard () {
  const [isPlayList, setIsPlayList] = useState(false)
  const [{ allSongs, isSongPlaying, songIndex }, dispatch] = useStateValue()

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then(data => {
        dispatch({
          type: actionTypes.SET_ALL_SONGS,
          allSongs: data
        })
      })
    }
  }, [allSongs, dispatch])

  const setCurrentPlaySong = si => {
    if (!isSongPlaying) {
      dispatch({
        type: actionTypes.SET_ISSONG_PLAYING,
        isSongPlaying: true
      })
    }
    if (songIndex !== si) {
      dispatch({
        type: actionTypes.SET_SONG_INDEXE,
        songIndex: si
      })
    }
  }

  return (
    <div className='absolute left-4 bottom-24 gap-2 py-2 w-350 max-w-[350px] h-510 max-h-[510px] flex flex-col overflow-y-scroll scrollbar-thin rounded-md shadow-md bg-purple-600'>
      {allSongs.length > 0 ? (
        allSongs.map((music, index) => (
          <motion.div
            initial={{ opacity: 0, translateX: -5 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`group w-full p-4 hover:bg-card flex gap-3 items-center cursor-pointer bg-transparent
            }`}
            onClick={() => setCurrentPlaySong(index)}
            key={index}
          >
            <IoMusicalNote className='text-textColor group-hover:text-headingColor text-2xl cursor-pointer' />

            <div className='flex items-start flex-col'>
              <p className='text-lg text-headingColor font-semibold'>
                {`${
                  music?.name.length > 12
                    ? music?.name.slice(0, 12)
                    : music?.name
                }`}{' '}
                <span className='text-base'>({music?.album})</span>
              </p>
              <p className='text-white'>
                {music?.artist}{' '}
                <span className='text-sm text-wi font-semibold'>
                  ({music?.category})
                </span>
              </p>
            </div>
          </motion.div>
        ))
      ) : (
        <></>
      )}
    </div>
  )
}

export default PlayListCard
