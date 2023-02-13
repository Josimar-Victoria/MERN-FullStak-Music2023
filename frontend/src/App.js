import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Dashboard, Home, Login } from './components'
import { app } from './config/firebase.config'
import { getAuth } from 'firebase/auth'
import { AnimatePresence } from 'framer-motion'
import { validateUser } from './api'
import { useStateValue } from './context/StateProvider'
import { actionTypes } from './context/reducer'

function App () {
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem('auth') === 'true'
  )
  const [{ user }, dispatch] = useStateValue()

  const firebaseAuth = getAuth(app)
  const navigate = useNavigate()

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(userCred => {
      if (userCred) {
        userCred.getIdToken().then(token => {
          // console.log(token)
          validateUser(token).then(data => {
            dispatch({
              type: actionTypes.SET_USER,
              user: data.user
            })
          })
        })
      } else {
        setAuth(false)
        window.localStorage.setItem('auth', 'false')
        dispatch({
          type: actionTypes.SET_USER,
          user: null
        })
        navigate('/login')
      }
    })
  }, [firebaseAuth, navigate, dispatch])

  return (
    <AnimatePresence>
      <div className='h-auto min-w-[680px] bg-black text-white flex justify-center items-center '>
        <Routes>
          <Route path='/*' element={<Home />} />
          <Route path='/login' element={<Login setAuth={setAuth} />} />
          <Route path='/dashboard/*' element={<Dashboard />} />
        </Routes>
      </div>
    </AnimatePresence>
  )
}

export default App
