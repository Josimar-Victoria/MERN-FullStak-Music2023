import React from 'react'
import Header from '../components/Header'
import { NavLink, Route, Routes } from 'react-router-dom'
import { IoHome } from 'react-icons/io5'
import { isActiveStyle, isNotActiveStyle } from '../utils/styles'
import DashboardHome from './DashboardHome'
import DashboardUsers from './DashboardUsers'
import DashboardSong from './DashboardSong'
import DashboardArtists from './DashboardArtists'
import DashboardAlbums from './DashboardAlbums'
import DashboardNewSongs from './DashboardNewSongs'


function Dashboard () {
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center'>
      <Header />

      <div className='w-[60%] my-2 p-4 flex items-center justify-evenly'>
        <NavLink
          to={'/dashboard/home'}
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }
        >
          <IoHome className='text-2xl' />
        </NavLink>

        <NavLink
          to={'/dashboard/user'}
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }
        >
          Users
        </NavLink>

        <NavLink
          to={'/dashboard/songs'}
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }
        >
          Songs
        </NavLink>

        <NavLink
          to={'/dashboard/artist'}
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }
        >
          Artists
        </NavLink>

        <NavLink
          to={'/dashboard/albums'}
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }
        >
          Albums
        </NavLink>

        <NavLink
          to={'/dashboard/newSong'}
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }
        >
          NewSong
        </NavLink>
      </div>

      <div className='my-4 w-full p-4 '>
        <Routes>
          <Route path='/home' element={<DashboardHome />} />
          <Route path='/user' element={<DashboardUsers />} />
          <Route path='/songs' element={<DashboardSong />} />
          <Route path='/artist' element={<DashboardArtists />} />
          <Route path='/albums' element={<DashboardAlbums />} />
          <Route path='/newSong' element={<DashboardNewSongs />} />
        </Routes>
      </div>
    </div>
  )
}

export default Dashboard
