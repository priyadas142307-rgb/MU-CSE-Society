import { useEffect, useState } from 'react'
import axios from 'axios'

function Home() {
  const [message, setMessage] = useState('Loading...')

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/home/')
      .then((response) => {
        setMessage(response.data.message)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <div>
      <h1>{message}</h1>
    </div>
  )
}

export default Home