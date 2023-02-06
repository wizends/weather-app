/* eslint-disable camelcase */

import circleRed from '../assets/circleRed.svg'
import circleOrange from '../assets/circleOrange.svg'
import circle3 from '../assets/circle3.svg'
import circle4 from '../assets/circle4.svg'
import circle5 from '../assets/circle5.svg'
import { Line } from '@ant-design/charts'
import { setConfig } from '../../charts/chartTempConfig'
import SearchBar from './SearchBard'
import { useSelector } from 'react-redux'

export default function Aside () {
  const props = useSelector(state => state.weather)
  const forecastFromApi = props[props.length - 1]
  const icons = [circleRed, circleOrange, circle3, circle4, circle5]
  const { current, forecast } = forecastFromApi

  const { feelslike_c, temp_c, uv, wind_degree, wind_kph } = current
  const today = forecast.forecastday[0].hour
  const data = today.map(hour => {
    return {
      time: hour.time.split(' ')[1].toString(),
      temp: Math.round(hour.temp_c)
    }
  })
  const config = setConfig(data)

  return (
    <section className='backdrop-blur-md border-slate-700 rounded-r-2xl border-r border-r-borderWhite'>
      <SearchBar />
      <aside className='grid grid-cols-2 content-start pt-20 items-center justify-items-start gap-y-6 gap-x-0 p-4  pl-10'>
        <h1 className='text-6xl'>{Math.round(temp_c)}°</h1>
        <h1 className='text-6xl flex flex-row items-center gap-2'><span className='text-4xl'>+/-</span> {Math.abs(Math.round(temp_c - feelslike_c))}</h1>
        <h3 className='pt-20'>{wind_degree}°</h3>
        <h3 className='pt-20'>Wind {wind_kph}k/h</h3>
        <div className='flex flex-row ml-4'>
          {icons.map((icon, index) => <img key={index} width={30} className='-ml-4' src={icon} />)}
        </div>
        <h3 className=''>{uv}% Indice uv</h3>
        <h4>Seguro</h4>
        <h4>Peligroso</h4>
        <ul className='-mt-4 flex flex-col items-start'>
          <li>0%-0.9%</li>
          <li>0.9%-11%</li>
        </ul>
        <ul className='-mt-4 flex flex-col items-start'>
          <li>12%-38%</li>
          <li>39%-90%</li>
        </ul>
        <Line className='z-10 max-w-xs text-white max-h-40' {...config} />
      </aside>
    </section>
  )
}
