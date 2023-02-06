import { useSelector } from 'react-redux'
import moment from 'moment'

export default function InfoSide () {
  const props = useSelector(state => state.weather)

  const forecastFromApi = props[props.length - 1]
  const { country, localtime, name, region, tz_id } = forecastFromApi.location
  const { code, text, icon } = forecastFromApi.current.condition
  console.log(forecastFromApi.location)
  const dateFormat = moment(localtime).format('DD-MM-yyyy HH:mm A')

  return (
    <div className='flex flex-col items-start'>
      <h1 className='text-6xl'>{text}</h1>
      <div className='flex flex-row items-center gap-3'>
        <img width={40} src={icon} />
        <h4>{name}, {country}  {dateFormat} </h4>
      </div>
      <div className='flex items-center w-full'>
        <h5>{region}</h5>
      </div>
    </div>
  )
}
