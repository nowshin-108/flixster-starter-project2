import { useState, useEffect } from 'react'
import './App.css'
import MovieList from './components/Movies/MovieList/MovieList'
import SearchForm from './components/SearchForm/SearchForm'
import DropDown from './components/DropDown/DropDown'

const App = () => {
  const [page, setPage] = useState(1)
  const [movieData, setMovieData] = useState(null);

  const fetchData = async () => {
          const apiKey = import.meta.env.VITE_APP_API_KEY
      
          const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`, {
              method: 'get',
              headers: new Headers({
                  'Authorization': 'Bearer ' + apiKey,
                  'accept': 'application/json'
              }),
          });
          console.log("Response ",response)
          const data = await response.json()
          console.log("Data after Json  ",data)
          setMovieData(data)
      };

  useEffect(() => {
      fetchData();
  }, [page]);

  // if data is empty, show a loading component
  if (!movieData) {
    return <div>Loading....</div>
  }

  console.log("movie data in app.jsx before passing it to forecast", movieData)
  return (
    <div className="App">
      <header id='app-header'>
        <h1>Flixster</h1>
        <SearchForm />
        <DropDown />
      </header>
      <MovieList page={page} data={movieData}/>
      <footer id='app-footer'>
        <p id='footer-content'>@nowshinanber</p>
      </footer>
    </div>
  )
}

export default App