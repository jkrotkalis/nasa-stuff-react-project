import React, { Component } from 'react'
import { Link } from "react-router-dom"

export default function Content () {
    return (
    <div>
        <Link to="/game">
            <div className="buttoncontainer">
                <button>Play!</button>
            </div>
        </Link>
        <Link to="/search">
            <div className="buttoncontainer">
                <button>Search!</button>
            </div>
        </Link>
        <Link to="/astronomy-picture-of-the-day">
            <div className="buttoncontainer">
                <button>Picture of the Day</button>
            </div>
        </Link>
    </div>
    )   
}
