// import React from 'react';
// import PropType from 'prop-types';
import './MovieList.css'
import MovieCard from '../MovieCard/MovieCard'

function MovieList({ page, data }) {
    console.log("movielist", data)
    // const movie_data = data;
    return (
        <>
            <div className="movie-list-container">
                {data.map((movie, idx) => (
                    <div className="movie-card" key={idx}>
                        <MovieCard poster={movie.poster_path} title={movie.title} rating={movie.vote_average} movie_id={movie.id} />
                    </div>
                ))}
            </div>
        </>
    );
}


export default MovieList;
