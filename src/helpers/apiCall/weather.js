
async function getForecast (lat, long, country) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '839dce94d0msha3affbc3dfbe5cep1ac454jsn67fba69769e9',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  }

  const response = country
    ? await fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${country}&days=3&lang=es`, options)
    : await fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${lat}%2C${long}&days=5&lang=es`, options)

  const json = await response.json()

  return json
}

export { getForecast }
