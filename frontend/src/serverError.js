import React from 'react'
import { Link } from 'react-router-dom'
import "./serverError.css"

const ServerError = () => {
  return (
    <div class="message">
	<h1>500</h1>
	<h3>Server Error</h3>
	<h2>Having issue please try after sometime</h2>
    <Link to="/"><button>Go Back</button></Link>
</div>
  )
}

export default ServerError