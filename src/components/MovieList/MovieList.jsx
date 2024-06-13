import PropType from 'prop-types';
import './MovieList.css'
import MovieCard from '../MovieCard/MovieCard'

function MovieList({ data }) {
    console.log("movielist", data)
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

export default MovieList

MovieList.propTypes = {
    data: PropType.array.isRequired,
}