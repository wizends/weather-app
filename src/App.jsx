import React, { useEffect, useState } from 'react'
import './App.css'
import Aside from './components/Aside'
import { useDispatch, useSelector } from 'react-redux'
import { getForecast } from './helpers/apiCall/weather'
import { loadWeather } from './features/weather/weatherSlice'
import InfoSide from './components/InfoSide'
import conditions from './assets/condition.json'

function App () {
  const dispatch = useDispatch()
  const data = useSelector(state => state.weather)
  const codes = data[data.length - 1]?.current.condition.code

  const [loading, setLoading] = useState(true)
  const [setPermission] = useState(false)
  const [background, setBackground] = useState()
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      getForecast(pos.coords.latitude, pos.coords.longitude)
        .then(weather => dispatch(loadWeather(weather)))
        .then((data) => {
          console.log(data)

          setLoading(false)
        })
        .catch(error => console.error(error))
    },
    error => {
      console.log(error)
      console.log('you denied the permissions so, lets type!')
      setPermission(false)
    })
  }, [])

  const handleBg = () => {
    const bg = conditions.filter(condition => {
      return condition.code === codes
    })
    if (bg[0].isDarkMode) {
      setBackground({
        backgroundImage: `url("/${bg[0].bg}")`,
        color: 'black'
      })
      return
    }
    setBackground({
      backgroundImage: `url("/${bg[0].bg}")`
    })
    console.log(bg)
  }
  return (
    <div className='App grid justify-center'>
      {!loading &&
        <section onLoad={handleBg} style={background} id='view' className='rounded-2xl grid lg:grid-flow-col lg:grid-cols-aside bg-cover overflow-hidden gap-6'>
          <Aside />
          <section className='flex flex-col justify-center items-start'>
            <InfoSide />
          </section>
        </section>}
    </div>
  )
}

export default App
