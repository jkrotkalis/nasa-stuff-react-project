import React, { useState } from 'react'

import { searchImages, SearchResponseItem } from 'requests/search'

import Form from './form'
import Results from './results'

export default function Search () {
    const [images, setImages] = useState(Array<SearchResponseItem>)

    function fetchImages (query: string) {
        return searchImages(query).then(json => {
            setImages(json.collection.items)
        })
    }

    return (
    <>  
        <Form fetchImages={fetchImages} />
        <Results results={images} />
    </> 
    )
}
