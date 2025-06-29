import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// Create a root
const root = createRoot(document.getElementById('root'))

// Render your app to the root
root.render(<App />)