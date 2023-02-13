import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { app } from '../config/firebase.config'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { FcGoogle } from 'react-icons/fc'
import { useStateValue } from '../context/StateProvider'
import { actionTypes } from '../context/reducer'
import { validateUser } from '../api'

function Login ({ setAuth }) {
  const [{ user }, dispatch] = useStateValue()
  const firebaseAuth = getAuth(app)
  const provider = new GoogleAuthProvider()

  const navigate = useNavigate()

  // Login con Google
  const lohinWitGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then(userCred => {
      if (userCred) {
        setAuth(true)
        window.localStorage.setItem('auth', 'true')

        firebaseAuth.onAuthStateChanged(userCred => {
          if (userCred) {
            userCred.getIdToken().then(token => {
              validateUser(token).then(data => {
                dispatch({
                  type: actionTypes.SET_USER,
                  user: data.user
                })
              })
            })
            navigate('/', { replace: true })
          } else {
            dispatch({
              type: actionTypes.SET_USER,
              user: null
            })
            setAuth(false)
            navigate('/login')
          }
        })
      }
    })
  }

  // si el usuario existe redirijelo ala URL del HOme
  useEffect(() => {
    if (window.localStorage.getItem('auth') === 'true') {
      navigate('/', { replace: true })
    }
  }, [navigate])

  return (
    <div className='relative w-screen h-screen'>
      <div className='absolute inset-0 bg-darkOverlay flex items-center justify-center p-4'>
        <div className='w-full md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex flex-col items-center justify-center'>
          <div
            onClick={lohinWitGoogle}
            className='flex items-center justify-center gap-3 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all '
          >
            <FcGoogle className='text-xl' />
            Sign in with Google
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
