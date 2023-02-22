import React, { useEffect } from 'react'

import { useStateValue } from '../context/StateProvider'
import { getAllAlbums } from '../api'
import { actionTypes } from '../context/reducer'
import { AlbumContainer } from '../components'

function DashboardAlbums() {
  const [{ allAlbums }, dispatch] = useStateValue()

  useEffect(() => {
    if (!allAlbums) {
      getAllAlbums().then(data => {
        dispatch({
          type: actionTypes.SET_ALL_ALBUMS,
          allAlbums: data
        })
      })
    }
  }, [allAlbums, dispatch])

  return (
    <div className='min-w-full p-4 flex items-center justify-center flex-col'>
      <div className='relative w-full my-4 p-4 py-16 border border-gray-300 rounded-md'>
        <AlbumContainer data={allAlbums} />
      </div>
    </div>
  )
}

export default DashboardAlbums
