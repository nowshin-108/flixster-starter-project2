import { useState, useEffect } from 'react'
import './App.css'
import MovieList from './components/MovieList/MovieList'
import DropDown from './components/DropDown/DropDown'

const App = () => {

  const [page, setPage] = useState(1)
  const [movieData, setMovieData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTabState, setSearchTabState] = useState("inactive");
  const [nowPlayingTabState, setNowPlayingTabState] = useState("active");
  const [displaySearch, setDisplaySearch] = useState("hide");
  const apiKey = import.meta.env.VITE_APP_API_KEY
  const default_url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + apiKey
    }
  };

  const fetchData = async (url, action) => {
    try {
      if (action === "load") {
        console.log("default loaded here")
        const response = await fetch(url, options);
        const Data = await response.json();
        setMovieData(movieData.concat(Data.results));
        console.log("Default movie data  ", movieData);
      }
      else if (action === "search") {
        setMovieData([]);
        console.log("MovieData set to empty", movieData)
        const response = await fetch(url, options);
        const Data = await response.json();
        setMovieData(movieData.concat(Data.results));
      }
      else if (action == "reload default") {
        console.log("default reloaded here")
        setMovieData([]);
        setPage(1);

        const response = await fetch(url, options);
        const Data = await response.json();
        setMovieData(movieData.concat(Data.results));
      }
    }
    catch (err){
      console.error('Error: ' + err);
    }
  };

  async function search(){
    if (searchQuery.replace(" ", "") != ""){
      const searchURL = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`;
      fetchData(searchURL, "search");
    }
    // else {
    //   fetchData(default_url, "reload default");
    // }
  }

  function handleSearchChange(event) {
    setSearchQuery(encodeURIComponent(event.target.value));
  }

  // load more functionality
  function LoadMore() {
    setPage(page + 1)

  }

  function toggleTabs(event) {
    if (event.target.id === "now-playing-tab") {
      setNowPlayingTabState("active");
      setSearchTabState("inactive");
      setDisplaySearch("hide");

      fetchData(default_url, "reload default");
    }
    else {
      setNowPlayingTabState("inactive");
      setSearchTabState("active");
      setDisplaySearch("show");

      search();
    }
  }

  function clearContainer(event){
    setMovieData([]);
    console.log("clear container clicked and movie data", movieData )
  }

  useEffect(() => {
    fetchData(default_url, "load");
  }, [page]);

  // if data is empty, show a loading component
  if (!movieData.length) {
    return <div>Loading....</div>
  }

  return (
    <div className="App">
      <header id='app-header'>
        <h1>Flixster</h1>
      </header>
      <button id='now-playing-tab' className={nowPlayingTabState} onClick={toggleTabs}>Now Playing</button>
      <button id='search-tab' className={searchTabState} onClick={toggleTabs}>Search</button>
      <DropDown />
      <div id='search-section' className={displaySearch}>
        <input className='search-bar' onChange={handleSearchChange} placeholder='Discover your next movie...'></input>
        <button onClick={() => { search(); clearContainer();}}>Search</button>
      </div>
      <MovieList data={movieData} />
      <button className="load-more-button" onClick={LoadMore}>Load More</button>
      <footer id='app-footer'>
        <p id='footer-content'>@nowshinanber</p>
      </footer>
    </div>
  )

}

export default App
