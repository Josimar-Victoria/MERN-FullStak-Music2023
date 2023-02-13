import React, { useEffect } from 'react'
import { useStateValue } from '../context/StateProvider'
import { getAllAlbums, getAllArtists, getAllSongs, getAllUsers } from '../api'
import { actionTypes } from '../context/reducer'
import { motion } from 'framer-motion'

import { FaUsers } from 'react-icons/fa'
import { GiLoveSong, GiMusicalNotes } from 'react-icons/gi'
import { RiUserStarFill } from 'react-icons/ri'
import { DashboardCard } from '../components'


function DashboardHome () {
  const [{ allUsers, allSongs, allArtists, allAlbums }, dispatch] =
    useStateValue()

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then(data => {
        dispatch({
          type: actionTypes.SET_ALL_USERS,
          allUsers: data
        })
      })
    }

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

    if (!allSongs) {
      getAllSongs().then(data => {
        dispatch({
          type: actionTypes.SET_ALL_SONGS,
          allSongs: data
        })
      })
    }
  }, [allUsers, dispatch, allArtists, allSongs, allAlbums])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className='w-full p-6 flex items-center justify-evenly flex-wrap'
    >
      <DashboardCard
        icon={<FaUsers />}
        name={'Users'}
        count={allUsers?.length > 0 ? allUsers?.length : 0}
      />
      <DashboardCard
        icon={<GiLoveSong />}
        name={'Songs'}
        count={allSongs?.length > 0 ? allSongs?.length : 0}
      />
      <DashboardCard
        icon={<RiUserStarFill />}
        name={'Artists'}
        count={allArtists?.length > 0 ? allArtists?.length : 0}
      />
      <DashboardCard
        icon={<GiMusicalNotes />}
        name={'Albums'}
        count={allAlbums?.length > 0 ? allAlbums?.length : 0}
      />
    </motion.div>
  )
}

export default DashboardHome
