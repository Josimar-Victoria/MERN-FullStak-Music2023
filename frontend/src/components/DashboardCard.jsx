import React from 'react'

function DashboardCard ({ icon, name, count }) {
  return (
    <div className='p-4 w-40 gap-3 h-auto text-center rounded-lg shadow-md bg-purple-700 '>
      {icon}
      <p className='text-xl text-white font-semibold'>{name}</p>
      <p className='text-xl text-white'> {count}</p>
    </div>
  )
}

export default DashboardCard
