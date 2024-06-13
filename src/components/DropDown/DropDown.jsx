import Select from 'react-select'
import './DropDown.css'

//put arg {onCityChange} 
function DropDown() {

    const options = [
        { value: 'original_title.asc', label: 'A-Z' },
        { value: 'primary_release_date.desc', label: 'Recent' },
        { value: 'popularity.desc', label: 'Popularity' },
        { value: 'vote_average.desc', label: 'Ratings' },
    ]

//   const handleSubmit = (event) => {
//     event.preventDefault()
//     const formData = new FormData(event.target)
//     const cityName = formData.get('city')
//     onCityChange(cityName)

//     event.target.reset();
//   };

return (
    <Select placeholder="Sort by" options={options} className="dropdown" />
    // add onSubmit={handleSubmit} beside className
    // <div className="dropdown">
    // <button className="dropbtn">Dropdown&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;v</button>
    // <div className="dropdown-content">
    //     <a href="#">Link 1</a>
    //     <a href="#">Link 2</a>
    //     <a href="#">Link 3</a>
    // </div>
    // </div>
    // <form>
    // <select id="rating-filter" 
    //     // value={selectedValue} 
    //     onChange={this.handleChange}
    // >
    //     <option value="Sort">Sort</option>
    //     <option value="Low rating">Low rating</option>
    //     <option value="High rating">High rating</option>
    //     <option value="A-Z">A-Z</option>
    //     <option value="Z-A">Z-A</option>
    // </select>
    // <input type="submit" value="Filter" />
    // </form>
);
}

export default DropDown