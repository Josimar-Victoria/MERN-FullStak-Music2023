import React, { useEffect, useState } from 'react'
import { ref, deleteObject } from 'firebase/storage'
import { motion } from 'framer-motion'
import { MdDelete } from 'react-icons/md'

import { storage } from '../config/firebase.config'
import { useStateValue } from '../context/StateProvider'
import {
  getAllAlbums,
  getAllArtists,
  getAllSongs,
  saveNewAlbum,
  saveNewArtist,
  saveNewSong
} from '../api'
import { actionTypes } from '../context/reducer'
import { FileLoader, FileUploader, FilterButtons } from '../components'
import { filterByLanguage, filters } from '../utils/supportfunctions'
import DisabledButton from '../components/DisabledButton'
// import AlertSuccess from './AlertSuccess'
// import AlertError from './AlertError'

function DashboardNewSongs () {
  const [songName, setSongName] = useState('')
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [songImageCover, setSongImageCover] = useState(null)
  const [imageUploadProgress, setImageUploadProgress] = useState(0)

  // useState Audios
  const [isAudioLoading, setIsAudioLoading] = useState(false)
  const [audioUploadProgress, setAudioUploadProgress] = useState(0)
  const [audioImageCover, setAudioImageCover] = useState(null)

  // useState Artist
  const [artistImageCover, setArtistImageCover] = useState(null)
  const [artistUploadProgress, setArtistUploadProgress] = useState(0)
  const [isArtistUploading, setIsArtistUploading] = useState(false)
  const [artistName, setArtistName] = useState('')
  const [twitter, setTwitter] = useState('')
  const [instagram, setInstagram] = useState('')
  // useState Album
  const [albumImageCover, setAlbumImageCover] = useState(null)
  const [albumUploadProgress, setAlbumUploadProgress] = useState(0)
  const [isAlbumUploading, setIsAlbumUploading] = useState(false)
  const [albumName, setAlbumName] = useState('')

  const [
    {
      allArtists,
      allAlbums,
      allSongs,
      artistFilter,
      albumFilter,
      filterTerm,
      languageFilter,
      alertType
    },
    dispatch
  ] = useStateValue()

  useEffect(() => {
    if (!allArtists) {
      getAllArtists().then(data => {
        dispatch({
          type: actionTypes.SET_ALL_ARTISTS,
          allArtists: data
        })
      })
    }

    if (!allAlbums) {
      getAllAlbums().then(data => {
        dispatch({
          type: actionTypes.SET_ALL_ALBUMS,
          allAlbums: data
        })
      })
    }
  }, [allArtists, allAlbums, dispatch])

  const deleteFileObject = (url, isImage) => {
    if (isImage) {
      setIsImageLoading(true)
      setSongImageCover(null)
      setIsAudioLoading(true)
      setIsArtistUploading(true)
      setIsAlbumUploading(true)

      // // Alert msg
      // dispatch({
      //   type: actionTypes.SET_ALERT_TYPE,
      //   alertType: 'danger'
      // })

      // setInterval(() => {
      //   dispatch({
      //     type: actionTypes.SET_ALERT_TYPE,
      //     alertType: null
      //   })
      // }, 4000)
    }
    const deleteRef = ref(storage, url)

    deleteObject(deleteRef).then(() => {
      setSongImageCover(null)
      setAudioImageCover(null)
      setArtistImageCover(null)
      setAlbumImageCover(null)
      setIsImageLoading(false)
      setIsAudioLoading(false)
      setIsArtistUploading(false)
      setIsAlbumUploading(false)
    })
  }

  const handleSaveSong = () => {
    if (!songImageCover || !audioImageCover) {
      // throw the alert
      // dispatch({
      //   type: actionTypes.SET_ALERT_TYPE,
      //   alertType: 'danger'
      // })

      // setInterval(() => {
      //   dispatch({
      //     type: actionTypes.SET_ALERT_TYPE,
      //     alertType: null
      //   })
      // }, 4000)
    } else {
      setIsAudioLoading(true)
      setIsImageLoading(true)

      const data = {
        name: songName,
        imageURL: songImageCover,
        songUrl: audioImageCover,
        artist: artistFilter,
        album: albumFilter,
        language: languageFilter,
        category: filterTerm
      }

      saveNewSong(data).then(res => {
        getAllSongs().then(songs => {
          dispatch({
            type: actionTypes.SET_ALL_SONGS,
            allSongs: songs
          })
        })
      })

      // Alert msg
      // dispatch({
      //   type: actionTypes.SET_ALERT_TYPE,
      //   alertType: 'success'
      // })

      // setInterval(() => {
      //   dispatch({
      //     type: actionTypes.SET_ALERT_TYPE,
      //     alertType: null
      //   })
      // }, 4000)
      setSongName(null)
      setIsAudioLoading(false)
      setIsImageLoading(false)
      setSongImageCover(null)
      setAudioImageCover(null)

      dispatch({ type: actionTypes.SET_ALBUM_FILTER, albumFilter: null })
      dispatch({ type: actionTypes.SET_ARTIST_FILTER, artistFilter: null })
      dispatch({ type: actionTypes.SET_LENGUAGE_FILTER, languageFilter: null })
      dispatch({ type: actionTypes.SET_FILTER_TEM, filterTerm: null })
    }
  }

  const handleDeleteFilteObject = () => {}

  const handleSaveArtist = () => {}

  return (
    <div className='flex flex-col items-center justify-center p-4 border border-purple-700 rounded-md gap-4'>
      <input
        type='text'
        placeholder='Type your song name'
        className='w-full p-3 rounded-md text-base outline-none shadow-sm border border-gray-300 hover:border-purple-700 bg-transparent'
        value={songName}
        onChange={e => setSongName(e.target.value)}
      />

      <div className='flex w-full justify-between flex-wrap items-center gap-4'>
        <FilterButtons filterData={allArtists} flag={'Artist'} />
        <FilterButtons filterData={allAlbums} flag={'Albums'} />
        <FilterButtons filterData={filterByLanguage} flag={'Languages'} />
        <FilterButtons filterData={filters} flag={'Category'} />
      </div>
      <div className='bg-cardOverlay backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer'>
        {isImageLoading && <FileLoader progress={imageUploadProgress} />}
        {!isImageLoading && (
          <>
            {!songImageCover ? (
              <FileUploader
                updateState={setSongImageCover}
                setProgress={setImageUploadProgress}
                isLoading={setIsImageLoading}
                isImage={true}
              />
            ) : (
              <div className='relative w-full h-full overflow-hidden rounded-md'>
                <img
                  src={songImageCover}
                  alt='songImg'
                  className='w-full h-full object-cover'
                />

                <button
                  type='button'
                  className='absolute bottom-3 right-3 p-3 rounded-full bg-red-600 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out'
                  onClick={() => deleteFileObject(songImageCover, true)}
                >
                  <MdDelete className='text-white' />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Audio File Uploading */}
      <div className='bg-cardOverlay backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer'>
        {isAudioLoading && <FileLoader progress={audioUploadProgress} />}
        {!isAudioLoading && (
          <>
            {!audioImageCover ? (
              <FileUploader
                updateState={setAudioImageCover}
                setProgress={setAudioUploadProgress}
                isLoading={setIsAudioLoading}
                isImage={false}
              />
            ) : (
              <div className='relative w-full h-full overflow-hidden rounded-md flex items-center justify-center'>
                <audio src={audioImageCover} controls></audio>

                <button
                  type='button'
                  className='absolute bottom-3 right-3 p-3 rounded-full bg-red-600 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out'
                  onClick={() => deleteFileObject(audioImageCover, false)}
                >
                  <MdDelete className='text-white' />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className='flex items-center cursor-pointer justify-center w-60 p-4 '>
        {isImageLoading || isAudioLoading ? (
          <DisabledButton />
        ) : (
          <motion.button
            whileTap={{ scale: 0.75 }}
            className='px-8 py-2 w-full rounded-md text-white bg-red-600 hover:shadow-lg'
            onClick={handleSaveSong}
          >
            Save song
          </motion.button>
        )}
      </div>
    </div>
  )
}

export default DashboardNewSongs
