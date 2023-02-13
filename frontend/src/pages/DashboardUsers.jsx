import React, { useEffect } from 'react'
import { useStateValue } from '../context/StateProvider'
import { getAllUsers } from '../api'
import { actionTypes } from '../context/reducer'
import DashboardUserCard from '../components/DashboardUserCard'

function DashboardUsers () {
  const [{ allUsers }, dispatch] = useStateValue()

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then(data => {
        dispatch({
          type: actionTypes.SET_ALL_USERS,
          allUsers: data
        })
      })
    }
  }, [allUsers, dispatch])

  return (
    <div className='w-full p-4 flex items-center justify-center flex-col'>
      {/* Filter */}
      <div className='absolute left-4 w-8 '></div>
      <div className='relative w-full py-12 min-h-[400px] overflow-x-scroll scrollbar-thin scrollbar-track-slate-300 scrollbar-thumb-slate-400 my-4 flex flex-col items-center justify-start p-4 border border-gray-300 rounded-md gap-3'>
        {/* Total count of the user */}
        <div className='absolute top-4 left-4'>
          <p className='text-sm font-bold'>
            Count{' '}
            <span className='text-xl font-semibold text-textColor'>
              {allUsers?.length}
            </span>
          </p>
        </div>
        {/* Table data */}
        <div className='w-full min-w-[750px] flex items-center justify-between'>
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Image</p>
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Name</p>
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Email</p>
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Verified</p>
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Created</p>
          {/* prettier-ignore */}
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Role</p>{' '}
        </div>
        {/* Table body content */}
        {allUsers &&
          allUsers.map((user, index) => (
            <DashboardUserCard key={index} data={user} index={index} />
          ))}

        <div className=''></div>
      </div>
    </div>
  )
}

export default DashboardUsers
