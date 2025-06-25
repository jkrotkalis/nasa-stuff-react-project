import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"

import Game from 'components/game'
import Search from 'components/search'
import AstronomyPicture from 'components/astronomy_picture'

import './style.css';

import Header from './header'
import IndexContent from './content'

export default function App () {
    // the welcome component has the header/navbar and the button to choose to search is toggled
    return (
        <BrowserRouter>
            <div>
            <Header />
            <Routes>
                <Route path="/" element={<IndexContent />} />
                <Route path="/game" element={<Game />} />
                <Route path="/search" element={<Search />}/>
                <Route path="/astronomy-picture-of-the-day" element={<AstronomyPicture />} />
            </Routes>
            </div>
        </BrowserRouter>
    )
}
