// import { useState } from 'react'
import './MovieCard.css'
import Modal from '../../Modal/Modal'

function MovieCard({poster, title, rating, movie_id}){
    
    return (
        <div className="movie-card">
            <img src= {`https://image.tmdb.org/t/p/w500${poster}`}/>
            <h3>{title}</h3>
            <p>{rating}</p>
            <Modal
                    title={title}
                    movie_id={movie_id}
                    // releaseDate={releaseDate}
                    // overview={overview}
                    // genres={genre}
                    // trailer={trailer}
                    // runtime={runtime}
                    // backdrop_path={backdrop_photo}

            />
        </div>
    )
}

export default MovieCard
