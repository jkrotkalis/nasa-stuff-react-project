import axios from 'axios'

// Create an instance of axios configured for the NASA image search API
export const client = axios.create({
  baseURL: 'https://images-api.nasa.gov',
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface SearchResponseItem {
    href: string,
    data: Array<{
        center: string,
        date_created: string,
        description: string,
        keywords: Array<string>,
        media_type: 'image' | 'video',
        nasa_id: string,
        title: string,
        secondary_creator: string
    }>,
    links: Array<{
        href: string,
        rel: string
    }>
}

export interface SearchResponse {
    collection: {
        version: string,
        href: string,
        items: Array<SearchResponseItem>,
        metadata: {
            total_hits: number
        },
        links: Array<{
            rel: 'prev' | 'next',
            prompt: 'Previous' | 'Next',
            href: string
        }>
    }
}

export const searchImages = async (query: string): Promise<SearchResponse> => {
    const response = await client.get(`search`, { params: { q: query }})

    return response.data
}