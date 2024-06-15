import { useState, useEffect } from 'react'
import './App.css'
import MovieList from './components/MovieList/MovieList'

const App = () => {

  //setting state
  const [page, setPage] = useState(1)
  const [movieData, setMovieData] = useState([]);
  const [nowPlayingTabState, setNowPlayingTabState] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMovies, setSortMovies] = useState("Popular");
  const [displayLoadMore, setDisplayLoadMore] = useState(true)

  const apiKey = import.meta.env.VITE_APP_API_KEY
  const default_url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;
  const options = {
                    method: 'GET',
                    headers: {
                      accept: 'application/json',
                      Authorization: 'Bearer ' + apiKey
                    }
                  };



  //fetchData function - used mostly all places to fetch API data
  const fetchData = async (url, action) => {
    try {
      if (action === "load") {
        const response = await fetch(url, options);
        const Data = await response.json();
        setMovieData(movieData.concat(Data.results));
      }
      else if (action === "search") {
        let tempMovieData =[]
        const response = await fetch(url, options);
        const Data = await response.json();
        setMovieData(tempMovieData.concat(Data.results));
      }
      else if (action === "sort") {
        let tempMovieData =[]
        const response = await fetch(url, options);
        const Data = await response.json();
        setMovieData(tempMovieData.concat(Data.results));
      }
      else if (action == "reload default") {
        let tempMovieData = []
        const response = await fetch(url, options);
        const Data = await response.json();
        setMovieData(tempMovieData.concat(Data.results));
      }
    }
    catch (err){
      console.error('Error: ' + err);
    }
  };


  //main search function
  async function search(){
    if (searchQuery.replace(" ", "") != ""){
      const searchURL = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`;
      fetchData(searchURL, "search");
    }
  }


  //main sort function
  function sortMovieCards(event) {
    setSortMovies(event.target.value);
  }

  //main load more function
  function LoadMore() {
    setPage(page + 1)
  }


  //toggle tab function - used when now-playing is clicked
  async function toggleTabs(event) {
    if (event.target.id === "now-playing-tab") {
      setNowPlayingTabState("active");
      setDisplayLoadMore(true);
      let tempPage = 1;
      let tempMovieData = []
      const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${tempPage}`, options);
      const Data = await response.json();
      setMovieData(tempMovieData.concat(Data.results));
    }
  }


  //handle submit funtion for search - disables load more, runs search
  function handleSubmit(event) {
    event.preventDefault();
    setDisplayLoadMore(false)
    search();
  }


  //handle change function for capturing the search query input
  function handleChange(event) {
    setSearchQuery(encodeURIComponent(event.target.value));
  }


  //default load for sort
  useEffect(() => {
    let filterURL = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1"

    if (sortMovies != "Popular") {
      filterURL += "&sort_by=";

      if (sortMovies === "Revenue") {
        filterURL += "revenue.desc";
      }
      else if (sortMovies === "Ascending") {
        filterURL += "revenue.asc";
      }
      else if (sortMovies === "Title (A-Z)") {
        filterURL += "title.asc";
      }
      else if (sortMovies === "Highly Rated") {
        filterURL += "vote_average.desc"
      }
    }

    fetchData(filterURL, "search")
  }, [sortMovies])


  //default load for main app
  useEffect(() => {
    fetchData(default_url, "load");
  }, [page]);



  //if data is empty, show a loading component
  if (!movieData.length) {
    return <div>Could not find it....</div>
  }


  return (
      <div className="App">
              
        <header className='app-header'>

          <div className='title-box'>

            <div className='title-img-div'>  
              <img src="src/assets/logo.jpeg" alt="" /> 
            </div>

            <div className='title-name-div'>
              <h1 className='title'>Flixster</h1>
            </div>

          </div>


          <div id='search-section'>
            <form onSubmit={handleSubmit}>
              <input className='search-bar' onChange={handleChange} placeholder='Search movie...'></input>
              <button className='search-button'>Search</button>
            </form>
          </div>

        </header>

        <div className="nav-bar">

            <button id='now-playing-tab' className={nowPlayingTabState} onClick={toggleTabs}>Now Playing</button>

            <div className="dropdown-box">

                <select name = "revenue" className = "dropdown" placeholder="Sort by" onChange={sortMovieCards}>
                  <option value = "Popular">Popular</option>
                  <option value = "Revenue">Revenue</option>
                  <option value = "Title (A-Z)">Title (A-Z)</option>
                  <option value = "Highly Rated">Highly Rated</option>
                </select>

            </div>

        </div>


        <MovieList data={movieData} />


        {displayLoadMore ?
        <button className="load-more-button" onClick={LoadMore}>Load More</button>
          :
          <h3 className='end-search-msg'>End of search results</h3>
        }


        <footer id='app-footer'>
          <p id='footer-content'>@nowshinanber</p>
        </footer>

      </div>
  );

}

export default App