import { deleteObject, ref } from 'firebase/storage'
import { storage } from '../config/firebase.config'

export const filters = [
  { _id: 2, name: 'Jasp', value: 'jasp' },
  { _id: 3, name: 'Rock', value: 'rock' },
  { _id: 4, name: 'Melody', value: 'melody' },
  { _id: 5, name: 'Karoke', value: 'karoke' }
]

export const filterByLanguage = [
  { _id: 1, name: 'Tamil', value: 'tamil' },
  { _id: 2, name: 'English', value: 'english' },
  { _id: 3, name: 'Malayalam', value: 'malayalam' },
  { _id: 4, name: 'Telungu', value: 'Telungu' },
  { _id: 5, name: 'Hindi', value: 'hindi' }
]

export const deleteAnObject = referenceUrl => {
  const deleteRef = ref(storage, referenceUrl)
  deleteObject(deleteRef)
    .then(() => {
      return true
    })
    .catch(error => {
      return false
    })
}
