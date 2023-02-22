import React, { useEffect, useState } from 'react'

import { IoMdClose } from 'react-icons/io'
import { IoArrowRedo, IoArrowUndo, IoMusicalNote } from 'react-icons/io5'
import { motion } from 'framer-motion'

import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

import { MdPlaylistPlay } from 'react-icons/md'
import { getAllSongs } from '../api'
import { RiPlayListFill } from 'react-icons/ri'
import { useStateValue } from '../context/StateProvider'
import { actionTypes } from '../context/reducer'
import PlayListCard from './PlayListCard'


function MusicPlayer () {
  const [isPlayList, setIsPlayList] = useState(false)
  const [{ allSongs, song, isSongPlaying, miniPlayer, songIndex }, dispatch] =
    useStateValue()

  const nextTrack = () => {
    if (songIndex > allSongs.length) {
      dispatch({
        type: actionTypes.SET_SONG_INDEXE,
        songIndex: 0
      })
    } else {
      dispatch({
        type: actionTypes.SET_SONG_INDEXE,
        songIndex: songIndex + 1
      })
    }
  }

  const previousTrack = () => {
    if (songIndex === 0) {
      dispatch({
        type: actionTypes.SET_SONG_INDEXE,
        songIndex: 0
      })
    } else {
      dispatch({
        type: actionTypes.SET_SONG_INDEXE,
        songIndex: songIndex - 1
      })
    }
  }

  const closeMusicPlayer = () => {
    if (isSongPlaying) {
      dispatch({
        type: actionTypes.SET_ISSONG_PLAYING,
        isSongPlaying: false
      })
    }
  }

  const togglePlayer = () => {
    if (miniPlayer) {
      dispatch({
        type: actionTypes.SET_MINI_PLAYER,
        miniPlayer: false
      })
    } else {
      dispatch({
        type: actionTypes.SET_MINI_PLAYER,
        miniPlayer: true
      })
    }
  }

  useEffect(() => {
    if (songIndex > allSongs.length) {
      dispatch({
        type: actionTypes.SET_SONG_INDEXE,
        songIndex: 0
      })
    }
  }, [allSongs, dispatch, songIndex])
  
  return (
    <div className='w-full flex items-center gap-3 overflow-hidden bg-white'>
      <div className={`w-full items-center gap-3 p-4 flex relative`}>
        <img
          src={allSongs[songIndex]?.imageURL}
          className='w-40 h-20 object-cover rounded-md'
          alt='img'
        />
        <div className='flex items-start flex-col'>
          <p className='text-xl text-purple-600 font-semibold'>
            {`${
              allSongs[songIndex]?.name.length > 20
                ? allSongs[songIndex]?.name.slice(0, 20)
                : allSongs[songIndex]?.name
            }`}{' '}
            <span className='text-base'>({allSongs[songIndex]?.album})</span>
          </p>
          <p className='text-purple-600'>
            {allSongs[songIndex]?.artist}{' '}
            <span className='text-sm text-purple-600 font-semibold'>
              ({allSongs[songIndex]?.category})
            </span>
          </p>
          <motion.i
            whileTap={{ scale: 0.8 }}
            onClick={() => setIsPlayList(!isPlayList)}
          >
            <RiPlayListFill className='text-purple-600 hover:text-headingColor text-3xl cursor-pointer' />
          </motion.i>
        </div>
        <div className='flex-1'>
          <AudioPlayer
            src={allSongs[songIndex]?.songUrl}
            onPlay={() => console.log('is playing')}
            autoPlay={true}
            showSkipControls={true}
            onClickNext={nextTrack}
            onClickPrevious={previousTrack}
          />
        </div>
        <div className='h-full flex items-center justify-center flex-col gap-3'>
          <motion.i whileTap={{ scale: 0.8 }} onClick={closeMusicPlayer}>
            <IoMdClose className='text-purple-600 hover:text-headingColor text-2xl cursor-pointer' />
          </motion.i>
          <motion.i whileTap={{ scale: 0.8 }} onClick={togglePlayer}>
            <IoArrowRedo className='text-purple-600 hover:text-headingColor text-2xl cursor-pointer' />
          </motion.i>
        </div>
      </div>

      {isPlayList && (
        <>
          <PlayListCard />
        </>
      )}
    </div>
  )
}

export default MusicPlayer
