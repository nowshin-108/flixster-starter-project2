// import React from 'react'
import './DropDown.css'

//put arg {onCityChange} 
function DropDown() {

//   const handleSubmit = (event) => {
//     event.preventDefault()
//     const formData = new FormData(event.target)
//     const cityName = formData.get('city')
//     onCityChange(cityName)

//     event.target.reset();
//   };

return (
    // add onSubmit={handleSubmit} beside className
    <div className="dropdown">
    <button className="dropbtn">Dropdown&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;v</button>
    <div className="dropdown-content">
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
        <a href="#">Link 3</a>
    </div>
    </div>
);
}

export default DropDown