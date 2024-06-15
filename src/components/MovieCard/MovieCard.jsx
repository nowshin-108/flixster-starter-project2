import { useState } from 'react'
import './MovieCard.css'
import PropType from 'prop-types';
import Modal from '../Modal/Modal'
import { FaHeart } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { FaStar } from "react-icons/fa";



function MovieCard({poster, title, rating, movie_id}){

    const[heart, setHeart] = useState(false);
    const[inWatchList, setInWatchList] = useState(false);
    // const[likedMovieID, setLikedMovieID] = useState([]);
    

    const handleHeart = () => {
        setHeart(!heart);
        };

    const handleWatchList = () => {
        setInWatchList(!inWatchList);
        // setLikedMovieID(prevLikedMovieID => [...prevLikedMovieID, movie_id]);
        };

    let imgSrc=`https://image.tmdb.org/t/p/w500${poster}`

    if (poster==null){
        imgSrc="src/assets/img-placeholder.jpeg"
    }

    return (
        <div className="movie-card">
            <div className='card-header'>
                {heart===true ?
                    <div className='liked-button' onClick={handleHeart}>
                    <FaHeart/>
                    </div>
                    :
                    <div className='not-liked-button' onClick={handleHeart}>
                    <FaHeart/>
                    </div>
                }

                <img src= {imgSrc} alt="Image not loading"/>
            </div>
            <h3>{title}</h3>
            <p><FaStar style={{ color:"#B59410"}}/>&nbsp; Rating:&nbsp;&nbsp;{rating}/10</p>
            {inWatchList ?
                    <div className='inWatchList-div'>
                        <button className='inWatchList-button' onClick={handleWatchList}><FaCheck /> WatchList</button>
                    </div>
                    :
                    <div className='not-inWatchList-div'>
                    <button className='not-inWatchList-button' onClick={handleWatchList}><IoMdAdd /> WatchList</button>
                    </div>
                }
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