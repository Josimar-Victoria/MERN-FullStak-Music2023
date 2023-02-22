import React, { useEffect } from 'react'
import { ArtistContainer } from '../components'
import { actionTypes } from '../context/reducer'
import { getAllArtists } from '../api'
import { useStateValue } from '../context/StateProvider'

function DashboardArtists() {
  const [{ allArtists }, dispatch] = useStateValue()

  useEffect(() => {
    if (!allArtists) {
      getAllArtists().then(data => {
        dispatch({
          type: actionTypes.SET_ALL_ARTISTS,
          allArtists: data
        })
      })
    }
  }, [allArtists, dispatch])

  return (
    <div className='min-w-full p-4 flex items-center justify-center flex-col'>
      <div className='relative w-full my-4 p-4 py-16 border border-purple-600 rounded-md'>
        <ArtistContainer data={allArtists} />
      </div>
    </div>
  )
}

export default DashboardArtists
