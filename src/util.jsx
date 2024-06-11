import { useState, useEffect } from 'react'

async function fetchData(page){

    const [movieData, setMovieData] = useState(null);

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

    useEffect(() => {
        fetchData();
    }, [page]);
    
    // if data is empty, show a loading component
    if (!movieData) {
        return <div>Loading....</div>
    }
}

export default fetchData;