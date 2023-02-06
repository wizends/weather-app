import { useState, useRef } from 'react'
import { getForecast } from '../helpers/apiCall/weather'

export default function useLoad () {
  const [forecast, setForecast] = useState('')
  const [isLoading, setLoading] = useState(true)
  const [permission, setPermission] = useState(false)
  const [forecasUpdated] = useState('')

  useRef(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      getForecast(pos.coords.latitude, pos.coords.longitude)
        .then(weather => setForecast(weather))
        .catch(error => console.error(error))
        .finally(() => setLoading(false))
    },
    error => {
      console.log(error)
      console.log('you denied the permissions so, lets type!')
      setPermission(false)
    })
  })

  return {
    forecast,
    isLoading,
    permission,
    forecasUpdated
  }
}
