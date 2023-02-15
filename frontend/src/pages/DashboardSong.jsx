import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IoAdd, IoPause, IoPlay, IoTrash } from 'react-icons/io5'
import { AiOutlineClear } from 'react-icons/ai'
import { getAllSongs } from '../api'
import { useStateValue } from '../context/StateProvider'
import { actionTypes } from '../context/reducer'
import { SongContainer } from '../components'

function DashboardSong () {
  const [songFilter, setSongFilter] = useState('')
  const [isFoucs, setIsFoucs] = useState(false)
  const [{ allSongs }, dispatch] = useStateValue()

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then(data => {
        dispatch({
          type: actionTypes.SET_ALL_SONGS,
          allSongs: data
        })
      })
    }
  }, [dispatch, allSongs])

  return (
    <div className='w-full p-4 flex items-center justify-center flex-col'>
      <div className='w-full flex justify-center items-center gap-20'>
        <NavLink
          to={'/dashboard/newSong'}
          className='flex items-center justify-center px-4 py-3 border rounded-md hover:border-purple-700 cursor-pointer'
        >
          <IoAdd />
        </NavLink>
        <input
          type='text'
          placeholder='Search Mere....'
          className={`w-52 px-4 py-2 border ${
            isFoucs ? 'border-purple-700 shadow-md' : 'border-gray-300'
          } rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out  text-base`}
          value={songFilter}
          onChange={e => setSongFilter(e.target.value)}
          onBlur={e => setIsFoucs(false)}
          onFocus={e => setIsFoucs(true)}
        />

        <i>
          <AiOutlineClear className='text-3xl  cursor-pointer hover:text-purple-700' />
        </i>
      </div>
      <div className='relative w-full my-4 p-4 border border-purple-700 rounded-md'>
        <div className='absolute top-4 left-4 '>
          <p className='text-xl font-bold'>
            <span className='text-sm font-semibold text-textColor'>
              Count :{' '}
            </span>
            {allSongs?.length}
          </p>
        </div>

        <SongContainer data={allSongs} />
      </div>
    </div>
  )
}

export default DashboardSong
