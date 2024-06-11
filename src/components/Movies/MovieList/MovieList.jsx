// import React from 'react';
import './MovieList.css'
import MovieCard from '../MovieCard/MovieCard'

function MovieList({ page, data }) {
    console.log("movielist", data)
    // const movie_data = data;
    return (
        <>
            <div className="movie-list-container">
                {data.map((movie, idx) => (
                    <div className="movie-card" key={movie.id}>
                        <MovieCard poster={movie.poster_path} title={movie.title} rating={movie.vote_average} />
                    </div>
                ))}
            </div>
        </>
    );
}


export default MovieList;
