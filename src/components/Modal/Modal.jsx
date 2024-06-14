import  { useState } from "react";
import PropType from 'prop-types';
import "./Modal.css";

function Modal({title, movie_id}) {

  const [modal, setModal] = useState(false);
  const [movieDetails, setMovieDetails] = useState("");
  const [genreData, setGenreData] = useState([]);
  const [trailerKey, setTrailerKey] = useState("")

  const apiKey = import.meta.env.VITE_APP_API_KEY
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + apiKey
    }
  };

  const fetchDetails = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`, options);
    const details = await response.json();
    console.log("API response from details URL after JSON", details)
    setMovieDetails(details);
    const genreNames = details.genres.map((genre) => genre.name);
    const genreNamesString = genreNames.join(", ");
    setGenreData(genreNamesString);
  };

  const fetchTrailer = async (movie_id) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`, options);
    console.log("API response from trailer URL", response)
    const data = await response.json();
    console.log("API response from trailer URL after json", data)
    let video = data.results.find((video) => video.site === "YouTube" && video.type === "Trailer");
    let videoURL = `https://www.youtube.com/embed/${video.key}`;
    setTrailerKey(videoURL)
  }



  const toggleModal = () => {
    setModal(!modal);
    fetchDetails();
    console.log("Movie deatils from API", movieDetails)
    console.log("Genre Data from API", genreData)
    fetchTrailer(movie_id)
  };


  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }


  let imgSrc=`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`
  if (movieDetails.backdrop_path==null){
      imgSrc="src/assets/img-placeholder.jpeg"
  }


  return (
    <>
      <button onClick={toggleModal} className="open-modal-button">
        Learn More
      </button>


      {modal && (
        <div className="overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
          <span className="close" onClick={toggleModal}>&times;</span>
            <img src={imgSrc} alt="Image could not be loaded." />
            <h2>{title}</h2>
            <h3>Released on: {movieDetails.release_date}</h3>
            <h3>Genre: {genreData}</h3>
            <h3>Runtime: {movieDetails.runtime} min</h3>
            <h3>Runtime: {movieDetails.runtime} min</h3>
            <p>
              Overview: {movieDetails.overview}
            </p>
            <div className="video-responsive">
              <iframe
                className="trailer-size"
                // width="853"
                // height="480"
                src={trailerKey}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
            </div>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}



    </>



  );


  
}


export default Modal


Modal.propTypes = {
    title: PropType.string.isRequired,
    movie_id: PropType.number.isRequired,
}