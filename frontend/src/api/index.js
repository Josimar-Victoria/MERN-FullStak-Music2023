import axios from 'axios'

const baseUrl = 'http://localhost:4000/v1'

export const validateUser = async token => {
  try {
    const res = await axios.get(`${baseUrl}/api/user/login`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })

    return res.data
  } catch (error) {}
}
