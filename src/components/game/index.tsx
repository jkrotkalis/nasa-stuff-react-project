import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { searchImages } from 'requests/search'

import './style.css'

const CELESTIAL_BODIES =  ["moon", "earth", "jupiter", "saturn", "pluto", "mars", "venus"]
  
export default function Game () {

    // State tracks the current image from the api, the correct answer, user's guess
    const [ image, setImage ] = useState<string>()
    const [ answer, setAnswer ] = useState<string>()
    const [ guess, setGuess ] = useState<string>()

    // Sets/Resets game, loads new image and answer when guess is reset
    useEffect(() => {
        if (guess == undefined) {
            setAnswer(undefined)
            getGameImage()
        }
    }, [guess])


    // Request to get the image for the game
    const getGameImage = () => {
        let randomSearchItem = CELESTIAL_BODIES[Math.floor(Math.random()*CELESTIAL_BODIES.length)]

        searchImages(randomSearchItem).then(json => {
            setAnswer(randomSearchItem)
            setGuess(undefined)
            // Pick a random image
            setImage(json.collection.items[Math.floor(Math.random()*json.collection.items.length)].links[0].href)
        })
    }

    const renderTitle = () => {
        if (guess) {
            if (guess == answer) {
                return <h1>You're Right!</h1>
            } else {
                return <h1>Wrong, Try Again. <br /> Correct Answer: <span className="capitalise">{answer}</span></h1>
            }
        }

        return <h1>Which celestial body is associated with this image:</h1>
    }

    const renderAnswers = () => {
        return (
            <div className="button-group">
                {CELESTIAL_BODIES.map(word => 
                    <button onClick={setGuess.bind(null, word)} id={word}>{word}</button>
                )}
            </div>
        )
    }

    const renderPlayAgain = () => (
        <div className="button-group">
            <button onClick={setGuess.bind(null, undefined)}>Again!</button>
            <Link to="/"><button className="back">Go Back</button></Link>
        </div>
    )

    // Renders the game image, the choices, and determines if the game is done and can be played again
    return (
        <div className="name-game">
            <div className="name-game__clue">
                <img src={image} />  
            </div>
            <div className="name-game__answers">
                {renderTitle()}
                {guess ? renderPlayAgain() : renderAnswers()}
            </div>
        </div>
    )
}
