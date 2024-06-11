// import React from 'react';
import './MovieList.css'
import MovieCard from '../MovieCard/MovieCard'

function MovieList({ page, data }) {

    // const movie_data = data;
    console.log("movieData ", data);
    return (
        <>
            <div className="movie-list-container">
                {data.results.map((movie, idx) => (
                    <div className="movie-card" key={movie.id}>
                        <MovieCard poster={movie.poster_path} title={movie.title} rating={movie.vote_average} />
                    </div>

                ))}
            </div>
        </>
    );
}


export default MovieList;
