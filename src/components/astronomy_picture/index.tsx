import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAstronomyPictureOfTheDay } from 'requests/apod'

import './style.css'
  
export default function AstronomyPicture () {
    useEffect(() => {
        // Get todays date in YYYY-MM-DD by discarding the time from a JSON datetime string
        const date = new Date().toJSON().slice(0, 10)
        fetchPicture(date)
    }, [])

    const [ date, setDate ] = useState<string>()
    const [ image, setImage ] = useState<string>()
    const [ error, setError ] = useState<string>()

    // Fetches Astronomy Picture of the Day for date (in YYYY-MM-DD format)
    const fetchPicture = (date: string) => {
        getAstronomyPictureOfTheDay(date).then(response => {
            // Only update date once we know we have a result
            // This can be changed if the project gets a proper NASA api key
            setDate(date)
            // Pick a random image
            setImage(response.url)
        }).catch(response => {
            if (response.response.status == 429) {
                setError('API rate limit exceeded')
            } else {
                setError(response.message)
            }
        })
    }

    const fetchPreviousDay = () => {
        const newDate = new Date(date || '')

        newDate.setDate(newDate.getDate() - 1)

        fetchPicture(newDate.toJSON().slice(0, 10))
    }

    if (error) return <div className="astronomy-picture"><h1>{error}</h1></div>
    if (!image) return <div className="astronomy-picture"><h1>Loading</h1></div>

    return (
        <div className="astronomy-picture">
            <h1>Astronomy picture of the day ({date})</h1>
            <img src={image} />
            <div className="button-group">
                <button onClick={fetchPreviousDay}>Previous Day</button>
                <Link to="/"><button>Go Back</button></Link>
            </div>
        </div>
    )
}
