import { useState, useEffect } from 'react'
import './App.css'
import MovieList from './components/MovieList/MovieList'
// import DropDown from './components/DropDown/DropDown'

const App = () => {

  const [page, setPage] = useState(1)
  const [displayLoadMore, setDisplayLoadMore] = useState(true)
  const [movieData, setMovieData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTabState, setSearchTabState] = useState("inactive");
  const [nowPlayingTabState, setNowPlayingTabState] = useState("active");
  const [displaySearch, setDisplaySearch] = useState("hide");
  const [sortMovies, setSortMovies] = useState("Popular");
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
        let tempMovieData =[]
        console.log("MovieData set to empty", movieData)
        const response = await fetch(url, options);
        const Data = await response.json();
        setMovieData(tempMovieData.concat(Data.results));
      }
      else if (action === "sort") {
        let tempMovieData =[]
        console.log("MovieData set to empty", movieData)
        const response = await fetch(url, options);
        const Data = await response.json();
        setMovieData(tempMovieData.concat(Data.results));
      }
      else if (action == "reload default") {
        console.log("default reloaded here")
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



  async function search(){
    if (searchQuery.replace(" ", "") != ""){
      const searchURL = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`;
      fetchData(searchURL, "search");
    }
  }



  function sortMovieCards(event) {
    setSortMovies(event.target.value);
  }


  function LoadMore() {
    setPage(page + 1)
  }



  function toggleTabs(event) {
    if (event.target.id === "now-playing-tab") {
      setNowPlayingTabState("active");
      setSearchTabState("inactive");
      setDisplaySearch("hide");
      setDisplayLoadMore(true);
      let tempPage = 1;
      setMovieData([])
      fetchData(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${tempPage}`, "reload default");
    }
    else {
      setNowPlayingTabState("inactive");
      setSearchTabState("active");
      setDisplaySearch("show");

    }
  }



  function handleSubmit(event) {
    event.preventDefault();
    setDisplayLoadMore(false)
    search();
  }



  function handleChange(event) {
    setSearchQuery(encodeURIComponent(event.target.value));
  }



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

    filterURL += "&api_key=" + String(apiKey);
    fetchData(filterURL, "search")
  }, [sortMovies])



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



      <section className="nav-bar">

          <div className="dropdowns">
            {/* <h3>Filter</h3> */}
            {/* <select name = "genre" className = "dropdown" onChange={filterMovieGenre}>
              <option value = "All">All</option>
              <option value = "Action">Action</option>
              <option value = "Adventure">Adventure</option>
              <option value = "Animation">Animation</option>
              <option value = "Comedy">Comedy</option>
              <option value = "Crime">Crime</option>
              <option value = "Documentary">Documentary</option>
              <option value = "Fantasy">Fantasy</option>
              <option value = "History">History</option>
              <option value = "Horror">Horror</option>
              <option value = "Mystery">Mystery</option>
              <option value = "Romance">Romance</option>
            </select> */}

            <h3>Sort By</h3>
            <select name = "revenue" className = "dropdown" onChange={sortMovieCards}>
              <option value = "Popular">Popular</option>
              <option value = "Revenue">Revenue</option>
              <option value = "Title (A-Z)">Title (A-Z)</option>
              <option value = "Highly Rated">Highly Rated</option>
            </select>
          </div>

        </section>



      <button id='now-playing-tab' className={nowPlayingTabState} onClick={toggleTabs}>Now Playing</button>



      <button id='search-tab' className={searchTabState} onClick={toggleTabs}>Search</button>
      <div id='search-section' className={displaySearch} >
        <form onSubmit={handleSubmit}>
        <input className='search-bar' onChange={handleChange} placeholder='Search movie...'></input>
        <button>Search</button>
        </form>
      </div>



{/* 
      <select className="sort-by" onChange={updateSearch}>
          <option value="release_date">Sort by Date</option>
          <option value="vote_average">Sort by Rating</option>
          <option value="genre">Sort by Genre</option>
      </select> */}



      <MovieList data={movieData} />



      {displayLoadMore ?
      <button className="load-more-button" onClick={LoadMore}>Load More</button>
        :
        <h3>End of search results</h3>
      }



      <footer id='app-footer'>
        <p id='footer-content'>@nowshinanber</p>
      </footer>



    </div>
  )

}

export default App