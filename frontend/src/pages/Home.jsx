import { useEffect, useState } from 'react'
import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

function Home() {
  const [message, setMessage] = useState('Loading...')

  useEffect(() => {
    axios.get(`${apiBaseUrl}/api/home/`)
      .then((response) => {
        setMessage(response.data.message)
      })
      .catch((error) => {
        console.error(error)
        setMessage('Failed to connect to backend API.')
      })
  }, [])

  return (
    <div>
      <h1>{message}</h1>
    </div>
  )
}

export default Home
