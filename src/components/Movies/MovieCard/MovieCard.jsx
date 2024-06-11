// import { useState } from 'react'
import './MovieCard.css'

function MovieCard({poster, title, rating}){
    
    return (
        <div className="movie-card">
            <img src= {`https://image.tmdb.org/t/p/w500${poster}`}/>
            <h3>{title}</h3>
            <p>{rating}</p>
        </div>
    )
}

export default MovieCard
