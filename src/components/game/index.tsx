import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { searchImages } from 'requests/search'

const celestialBodies =  ["moon", "earth", "jupiter", "saturn", "pluto", "mars", "venus"]
  
export default function Game () {

    // State tracks the current image from the api, the correct answer, user's guess
    const [ image, setImage ] = useState('')
    const [ answer, setAnswer ] = useState('')
    const [ guess, setGuess ] = useState('')

    useEffect(() => {
        getGameImage()
    }, [])

    // Resets game, loads new image and answer when guess is reset
    useEffect(() => {
        if (guess == '') {
            setAnswer('')
            getGameImage()
        }
    }, [guess])


    // Request to get the image for the game
    const getGameImage = () => {
        let randomSearchItem = celestialBodies[Math.floor(Math.random()*celestialBodies.length)]

        searchImages(randomSearchItem).then(json => {
            setAnswer(randomSearchItem)
            // Pick a random image
            setImage(json.collection.items[Math.floor(Math.random()*json.collection.items.length)].links[0].href)
        })

    }

    // Render choices
    const renderChoices = () => {
        return celestialBodies.map(word => (
                <div className="guessing">
                    <button onClick={setGuess.bind(null, word)} id={word}>{word}</button>
                </div>
            )   
        )   
    }

    const renderGame = () => {
        if (guess) {
            if (guess == answer) {
                return "You're Right!"
            } else {
                return "Wrong, Try Again. Correct Answer: " + answer
            }
        }
        return renderChoices()
    }

    const renderPlayAgain = () => (
        <div className="playagainbutton">
            <button onClick={setGuess.bind(null, '')}>Again!</button>
            <Link to="/"><button className="back">Go Back</button></Link>
        </div>
    )

    if (answer == '') {
        return (
            <div className="namegame" >
                <div className="titlegame">
                    Loading
                </div>
            </div> 
        )
    }

    // Renders the game image, the choices, and determines if the game is done and can be played again
    return (
        <div className="namegame" >
            <div className="titlegame">Guess which one is associated with this image:</div>
            <img src={image} id="namegameimage" />
            <div className="namegamebutton">{renderGame()}</div>
            {guess ? renderPlayAgain() : null}
        </div>
    )
}
