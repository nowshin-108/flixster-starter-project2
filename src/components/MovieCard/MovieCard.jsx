import './MovieCard.css'
import PropType from 'prop-types';
import Modal from '../Modal/Modal'

function MovieCard({poster, title, rating, movie_id}){



    let imgSrc=`https://image.tmdb.org/t/p/w500${poster}`

    if (poster==null){
        imgSrc="src/assets/img-placeholder.jpeg"
    }



    return (
        <div className="movie-card">
            <img src= {imgSrc} alt="Image not loading"/>
            <h3>{title}</h3>
            <p>{rating}</p>
            <Modal
                    title={title}
                    movie_id={movie_id}
            />
        </div>
    )
}



export default MovieCard



MovieCard.propTypes = {
    poster: PropType.string,
    title: PropType.string,
    rating: PropType.number,
    movie_id: PropType.number,
}