import React, { useState } from 'react'
import { motion } from 'framer-motion'
import moment from 'moment'
import { useStateValue } from '../context/StateProvider'
import { changingUserRole, getAllUsers, removeUser } from '../api'
import { actionTypes } from '../context/reducer'
import { MdDelete } from 'react-icons/md'

function DashboardUserCard ({ data, index }) {
  const [isUserRoleUpdated, setisUserRoleUpdated] = useState(false)
  const [{ user, allUsers }, dispatch] = useStateValue()
  const createdAt = moment().subtract(10, 'days').calendar()
  // console.log(user)s

  // Elimar Usuarios
  const handleDeleteUser = async userId => {
    removeUser(userId).then(res => {
      if (res) {
        getAllUsers().then(data => {
          dispatch({
            type: actionTypes.SET_ALL_USERS,
            allUsers: data
          })
        })
      }
    })
  }

  // Actualizar usuarios a Admin
  const updateUserRole = async (userId, role) => {
    setisUserRoleUpdated(false)
    changingUserRole(userId, role).then(result => {
      if (result) {
        getAllUsers().then(data => {
          dispatch({
            type: actionTypes.SET_ALL_USERS,
            allUsers: data
          })
        })
      }
    })
  }

  return (
    <motion.div
      key={index}
      className='relative w-full rounded-md flex items-center justify-between py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-sm'
    >
      {data?._id !== user?._id && (
        <motion.div
          whileTap={{ scale: 0.75 }}
          className='absolute left-4 w-8 h-8 rounded-md flex items-center justify-center bg-gray-200'
          onClick={() => handleDeleteUser(data?._id)}
        >
          <MdDelete className='text-xl text-purple-700 hover:text-red-500' />
        </motion.div>
      )}

      <div className='w-275 min-w-[160px] flex items-center justify-center'>
        <img
          src={data?.imageUrl}
          alt=''
          className='w-10 h-10 object-cover rounded-md min-w-[40px] shadow-md'
          referrerPolicy='no-referrer'
        />
      </div>

      <p className='text-base text-textColor w-275 min-w-[160px] text-center'>
        {data.name}
      </p>
      <p className='text-base text-textColor w-275 min-w-[160px] text-center'>
        {data.email}
      </p>
      <p className='text-base text-textColor w-275 min-w-[160px] text-center'>
        {data.email_verified ? 'True' : 'False'}
      </p>
      <p className='text-base text-textColor w-275 min-w-[160px] text-center'>
        {createdAt}
      </p>
      <div className='w-275 min-w-[160px] text-center flex items-center justify-center gap-6 relative'>
        <p className='text-base text-textColor text-center'>{data.role}</p>

        {data?._id !== user?._id && (
          <motion.p
            whileTap={{ scale: 0.77 }}
            className='text-[10px] font-semibold text-white px-1 bg-purple-700 rounded-sm hover:shadow-md '
            onClick={() => setisUserRoleUpdated(true)}
          >
            {data?.role === 'admin' ? 'aember' : 'admin'}
          </motion.p>
        )}

        {isUserRoleUpdated && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className='absolute z-10 top-6 right-4 p-4 flex items-start flex-col gap-4 bg-white shadow-xl rounded-md'
          >
            <p className='text-textColor text-sm font-semibold '>
              Are you sure, do you want to mark the user as{' '}
              <span>{data?.role === 'admin' ? 'Menber' : 'Admin'}</span>?
            </p>
            <div className='flex items-center gap-4'>
              <motion.button
                whileTap={{ scale: 0.75 }}
                className='outline-none border-none text-sm px-4 py-1 rounded-md bg-purple-700 text-white hover:shadow-md'
                onClick={() =>
                  updateUserRole(
                    data?._id,
                    data?.role === 'admin' ? 'member' : 'admin'
                  )
                }
              >
                Yhea
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.75 }}
                className='outline-none border-none text-sm px-4 py-1 rounded-md bg-purple-700 text-white hover:shadow-md'
                onClick={() => setisUserRoleUpdated(false)}
              >
                Not
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default DashboardUserCard
