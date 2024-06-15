import  { useState } from "react";
import PropType from 'prop-types';
import { FaPlay } from "react-icons/fa";
import "./Modal.css";

function Modal({title, movie_id}) {

  // setting states
  const [modal, setModal] = useState(false);
  const [movieDetails, setMovieDetails] = useState("");
  const [genreData, setGenreData] = useState([]);
  const [URLKey, setURLKey] = useState("")

  const apiKey = import.meta.env.VITE_APP_API_KEY
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + apiKey
    }
  };

  // fetching movie deatails for modal info - (p.s. now playing URL url doesn't have genre & run time 
  // which is why needed to make a seperate api call for movie details)
  const fetchDetails = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`, options);
    const details = await response.json();
    setMovieDetails(details);
    const genreNames = details.genres.map((genre) => genre.name);
    const genreNamesString = genreNames.join(", ");
    setGenreData(genreNamesString);
  };

  // fetching URL id of trailer video
  const fetchTrailer = async (movie_id) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`, options);
    const data = await response.json();
    let video = data.results.find((video) => video.site === "YouTube" && video.type === "Trailer");
    let videoURL = `https://www.youtube.com/embed/${video.key}`;
    setURLKey(videoURL)
  }


  // function to open modal on click
  const toggleModal = () => {
    setModal(!modal);
    fetchDetails();
    console.log("Movie deatils from API", movieDetails)
    console.log("Genre Data from API", genreData)
    fetchTrailer(movie_id)
  };


  // if modal is true then class is added, relevant CSS becomes active and modal gets displayed
  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  // handling null results from API for backdrop poster
  let imgSrc=`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`
  if (movieDetails.backdrop_path==null){
      imgSrc="src/assets/img-placeholder.jpeg"
  }


  return (
    <>
      <button onClick={toggleModal} className="open-modal-button">
      <FaPlay /> Trailer
      </button>

      {modal && (
        <div className="overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>

            <span className="close" onClick={toggleModal}>&times;</span>

            <iframe
                  className="trailer-size"
                  width="853"
                  height="480"
                  src={URLKey}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
            />

            <h2 style={{color:"#B59410"}}>{title}</h2>
            <p><b>Released on: </b>{movieDetails.release_date}</p>
            <p><b>Genre: </b> {genreData}</p>
            <p><b>Runtime: </b> {movieDetails.runtime} min</p>
            <p><b>Overview: </b> {movieDetails.overview}</p>

            <img src={imgSrc} alt="Image could not be loaded." />

            <button className="close-modal" onClick={toggleModal}>CLOSE</button>
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