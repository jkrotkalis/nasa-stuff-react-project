import axios from 'axios'

// Create an instance of axios configured for the Astronomy Picture of the Day api
export const client = axios.create({
  baseURL: 'https://api.nasa.gov/planetary/apod',
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    api_key: 'DEMO_KEY'
  }
})

interface AstronomyPictureOfTheDayResponse {
    date: string,
    explanation: string,
    hdurl: string,
    media_type: string,
    service_version: string,
    title: string,
    url: string
}

export const getAstronomyPictureOfTheDay = async (date: string): Promise<AstronomyPictureOfTheDayResponse> => {
    const response = await client.get<AstronomyPictureOfTheDayResponse>('', { params: { date } })

    return response.data
}