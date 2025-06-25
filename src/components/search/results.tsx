import React from 'react'

import { SearchResponseItem } from 'requests/search'

type SearchResultsProps = {
    results: Array<SearchResponseItem>
}

export default function SearchResults (props: SearchResultsProps) {

    // This function helps when presenting the cards - if the title and description are the same, it doesn't show the description
    const sameContent = (a: string, b: string) => {
        if (a === b) {
            return null
        } else {
            return b
        }
    }

  // This function determines if an image is present in the object and if not, renders a default image
    const hasImage = (result: SearchResponseItem) => {
      if (typeof result.links !== 'undefined') {
        return result.links[0].href
      } else {
        return '/moon.jpg'
      }
    }

    // This determines if the title exists, much like the function above
    const hasContent = (result: SearchResponseItem) => {
      if (typeof result.data !== 'undefined') {
        return result.data[0].title
      } else {
        return "No content"
      }
    }

    // This determines the HTML to render and the card structure, mapping the images from the state onto each card
    const showResults = (results: Array<SearchResponseItem>) => {
        if (results.length > 0) {
            return results.map(result =>
                <>
                    <img src={hasImage(result)} alt="" />
                    <div>
                        <h2>{hasContent(result)}</h2>
                        <div>
                            {sameContent(result.data[0].title, result.data[0].description)}
                        </div>
                    </div>
                    <div className="search__result-source">
                        From: {result.data[0].secondary_creator || 'NASA'}
                    </div>
                </>)
        } else {
            return noResults()
        }
    }

    // A function to help show a message when the search term returns no results
    const noResults = () => {
         return <h2>No results yet</h2>
    }

    // The Search field is rendered and the results are presented.
    return (
        <div className="search__results">
            {showResults(props.results)}
        </div>
    )

}