// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAlggKftumoxR-z9Bf2QhAkmidxr2cGfYU',
  authDomain: 'fullmuss-db511.firebaseapp.com',
  projectId: 'fullmuss-db511',
  storageBucket: 'fullmuss-db511.appspot.com',
  messagingSenderId: '971924686209',
  appId: '1:971924686209:web:93a7b6bef68c3848ee5480'
}

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)
const storage = getStorage(app)

export { app, storage } 
