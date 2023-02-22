import React from 'react'
import AlbumCard from './AlbumCard'

function AlbumContainer({data}) {
    return (
        <div className=' w-full  flex flex-wrap gap-3  items-center justify-evenly'>
          {data && data.map((song, i) => <AlbumCard key={i} data={song} />)}
        </div>
      )
}

export default AlbumContainer
