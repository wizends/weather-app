const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '839dce94d0msha3affbc3dfbe5cep1ac454jsn67fba69769e9',
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
  }
}

export default async function autoComplete (query) {
  try {
    const response = await fetch(`https://weatherapi-com.p.rapidapi.com/search.json?q=${query}`, options)
    const json = await response.json()

    return json
  } catch (error) {
    throw new Error(error)
  }
}
