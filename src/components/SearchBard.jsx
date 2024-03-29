
import { SearchIcon } from './SearchIcon'
import { TemperatureIcon } from './TemperatureIcon'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateWeather } from '../features/weather/weatherSlice'
import { getForecast } from '../helpers/apiCall/weather'
import autoComplete from '../helpers/apiCall/autoCompleteApi'

export default function SearchBar () {
  const dispatch = useDispatch()

  const [update, setUpdate] = useState('')
  const [match, setMatch] = useState('')
  const [searchData, setSearch] = useState('')

  const [visibility, setVisibility] = useState(true)

  useMemo(async () => {
    setVisibility(true)
    if (update.length > 2) {
      setMatch(await autoComplete(update.toLowerCase()))
    }
  }, [update])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (update === '') return
    console.log(searchData)
    getForecast(searchData || update)
      .then(weather => {
        dispatch(updateWeather(weather))
      })
      .catch(error => console.error(error))
  }

  const handleClick = (event) => {
    console.log(event.target.parentElement.ariaValueText)
    setSearch(event.target.parentElement.ariaValueText)
    setUpdate(event.target.innerText)
    setVisibility(false)
  }
  useEffect(() => {
    window.addEventListener('click', () => {
      setVisibility(false)
    })
  })

  return (
    <div>
      <form onSubmit={handleSubmit} className='mr-0 relative flex items-end'>
        <span className='absolute mb-1 left-3'>
          <TemperatureIcon />
        </span>
        <input
          id='search'
          type='text'
          value={update}
          className='pl-12 w-full bg-transparent mt-10 border-b border-white focus:border-transparent focus:outline-none focus:border-b-white'
          placeholder='Ciudad'
          onChange={e => setUpdate(e.target.value)}
        />
        {visibility && update.length > 2 && match &&

          <ul className='absolute flex flex-col w-96 items-start left-12 bg-slate-800 rounded-lg p-2 z-50 gap-y-4 overflow-hidden top-20'>{
          match.map(
            country => (
              <li
                aria-valuetext={country.url}
                onClick={handleClick}
                className='cursor-pointer hover:bg-white hover:text-black w-full flex flex-col items-start rounded-md'
                key={country.id}
              >
                {console.log(country)}
                <span className='w-full'>{country.name}</span>
                <span className='w-full'>{country.region}, {country.country}</span>
              </li>)
          )
        }
          </ul>}
        <button type='submit' className='absolute right-3 mb-1'>
          <SearchIcon />
        </button>
      </form>
    </div>
  )
}
