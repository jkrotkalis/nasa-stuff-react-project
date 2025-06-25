import React, { Component } from 'react'
import { Link } from "react-router-dom"

export default function IndexContent () {
    return (
    <div className="button-group">
        <Link to="/game">
            <button>Play</button>
        </Link>
        <Link to="/search">
            <button>Search</button>
        </Link>
        <Link to="/astronomy-picture-of-the-day">
            <button>Picture of the Day</button>
        </Link>
    </div>
    )   
}
