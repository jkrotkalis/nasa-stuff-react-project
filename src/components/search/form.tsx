import React, { useState, ChangeEvent, SyntheticEvent } from 'react'
import { Link } from "react-router-dom"

type SearchFormProps = {
  fetchImages: Function
}

export default function SearchForm (props: SearchFormProps) {

  const [ query, setQuery ] = useState('')

  // This lets the SearchImages component know to use the query here for the search action
  const handleSubmit = (event: SyntheticEvent) => {
    
    event.preventDefault?.()
    props.fetchImages(query)
  }

  const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  // Renders a form to search
  return (
    <div className="searchcontent">
      <h3 className="searchtext">Enter a Celestial Term:</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={handleChangeQuery} />
        <Link to="/search" onClick={handleSubmit}><button id="searchformbutton">Submit</button></Link>
      </form>
    </div>
  )
}