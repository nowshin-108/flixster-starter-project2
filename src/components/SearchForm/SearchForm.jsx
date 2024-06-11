// import React from 'react'
import './SearchForm.css'

//put arg {onCityChange} 
function SearchForm() {

//   const handleSubmit = (event) => {
//     event.preventDefault()
//     const formData = new FormData(event.target)
//     const cityName = formData.get('city')
//     onCityChange(cityName)

//     event.target.reset();
//   };

return (
    // add onSubmit={handleSubmit} beside className
    <form className="search-form">
        <input className="search-container"></input>
        <button>Search</button>
    </form>
);
}

export default SearchForm