import React, { useState } from 'react'
import { IoChevronDown } from 'react-icons/io5'
import { motion } from 'framer-motion'
import { useStateValue } from '../context/StateProvider'
import { actionTypes } from '../context/reducer'

function FilterButtons ({ filterData, flag }) {
  const [filterName, setFilterName] = useState(false)
  const [filterMenu, setFilterMenu] = useState(false)
  const [{ artistFilter, filterTerm, albumFilter, languageFilter }, dispatch] =
    useStateValue()

  const updateFilterButton = name => {
    setFilterName(name)
    setFilterMenu(false)
    if (flag === 'Artist') {
      dispatch({
        type: actionTypes.SET_ARTIST_FILTER,
        artistFilter: name
      })
    }

    if (flag === 'Albums') {
      dispatch({
        type: actionTypes.SET_ALBUM_FILTER,
        albumFilter: name
      })
    }

    if (flag === 'Languages') {
      dispatch({
        type: actionTypes.SET_LENGUAGE_FILTER,
        languageFilter: name
      })
    }

    if (flag === 'Category') {
      dispatch({
        type: actionTypes.SET_FILTER_TEM,
        filterTerm: name
      })
    }
  }

  return (
    <div className='border border-gray-300 rounded-md px-4 py-1 relative cursor-pointer hover:border-purple-700'>
      <p
        className='text-base tracking-wide flex items-center gap-2'
        onClick={() => setFilterMenu(!filterMenu)}
      >
        {!filterName && flag}
        {filterName && (
          <>
            {filterName.length > 15
              ? `${filterName.slice(0, 15)}...`
              : filterName}
          </>
        )}
        <IoChevronDown
          className={`text-base text-textColor duration-150 transition-all ease-in-out ${
            filterMenu ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </p>
      {filterData && filterMenu && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className='w-48 z-50 bg-white text-black backdrop-blur-sm max-h-44 overflow-y-scroll scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 py-2 flex flex-col rounded-md shadow-md absolute top-8 left-0'
        >
          {filterData?.map(data => (
            <div
              key={data._id}
              className='flex items-center gap-2 px4 py-1 hover:bg-gray-200'
              onClick={() => updateFilterButton(data.name)}
            >
              {(flag === 'Artist' || flag === 'Albums') && (
                <motion.img
                  src={data.imageURL}
                  alt=''
                  className='w-8 min-w-[32px] h-8 rounded-full object-cover'
                />
              )}
              <p className='w-full'>
                {data.name.length > 15
                  ? `${data.name.slice(0, 15)}..`
                  : data.name}
              </p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default FilterButtons
