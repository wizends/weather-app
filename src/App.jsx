import React, { useEffect, useRef, useState } from 'react'
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
  const [permission, setPermission] = useState(false)
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
        backgroundImage: `url("../src/assets/${bg[0].bg}")`,
        color: 'black'
      })
      return
    }
    setBackground({
      backgroundImage: `url("../src/assets/${bg[0].bg}")`
    })
    console.log(bg)
  }
  return (
    <div className='App grid justify-center'>
      {!loading &&
        <section onLoad={handleBg} style={background} id='view' className='w-[80vw] h-[80vh] rounded-2xl grid  grid-flow-col grid-cols-aside bg-cover overflow-hidden'>
          <Aside />
          <section className='flex flex-col justify-center items-start pl-12'>
            <InfoSide />
          </section>
        </section>}
    </div>
  )
}

export default App
