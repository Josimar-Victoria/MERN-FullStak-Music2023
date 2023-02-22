import React from 'react'
import ArtistCard from './ArtistCard'

function ArtistContainer ({ data }) {
  // console.log(data)
  return (
    <div className=' w-full  flex flex-wrap gap-3  items-center justify-evenly'>
      {data && data.map((artist, i) => <ArtistCard key={i} data={artist} />)}
    </div>
  )
}

export default ArtistContainer
