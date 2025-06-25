import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAstronomyPictureOfTheDay } from 'requests/apod'
  
export default function AstronomyPicture () {
    useEffect(() => {
        // Get todays date in YYYY-MM-DD by discarding the time from a JSON datetime string
        const date = new Date().toJSON().slice(0, 10)
        fetchPicture(date)
    }, [])

    const [ date, setDate ] = useState<string>()
    const [ image, setImage ] = useState<string>()

    // Fetches Astronomy Picture of the Day for date (in YYYY-MM-DD format)
    const fetchPicture = (date: string) => {
        getAstronomyPictureOfTheDay(date).then(response => {
            // Only update date once we know we have a result
            // This can be changed if the project gets a proper NASA api key
            setDate(date)
            // Pick a random image
            setImage(response.url)
        })
    }

    const fetchPreviousDay = () => {
        const newDate = new Date(date || '')

        newDate.setDate(newDate.getDate() - 1)

        fetchPicture(newDate.toJSON().slice(0, 10))
    }

    return (
        <div className="namegame" >
            <div className="titlegame">Astronomy picture of the day ({date})</div>
            <img src={image} id="namegameimage" />
            <div className="playagainbutton">
                {!!date && <button onClick={fetchPreviousDay}>Go back a day</button>}
                <Link to="/"><button className="back">Go Back</button></Link>
            </div>
        </div>
    )
}
