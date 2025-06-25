import React, { useState } from 'react'

import { searchImages, SearchResponseItem } from 'requests/search'

import Form from './form'
import Results from './results'

import './style.css'

export default function Search () {
    const [images, setImages] = useState(Array<SearchResponseItem>)

    function fetchImages (query: string) {
        return searchImages(query).then(json => {
            setImages(json.collection.items)
        })
    }

    return (
    <div>  
        <Form fetchImages={fetchImages} />
        <Results results={images} />
    </div> 
    )
}
