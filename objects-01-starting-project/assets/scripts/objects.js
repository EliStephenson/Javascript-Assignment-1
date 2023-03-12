const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-Btn');

const movies = [];

const addMovieHandler = () => {
    const title = document.getElementById('title').value;
    const extraName = document.getElementById('extra-name').value;
    const extraValue = document.getElementById('extra-value').value;

    if (
        title.trim() === '' ||
        extraName.trim() === '' ||
        extraValue.trim() === '' 
    ) {
        return;
    }

    const newMovie = {
        info: { // creates nested object
            title, // using alone if the value name is same as key name (same as title: title)
            [extraName]: extraValue
        },
        id: Math.random()
    }; 

    movies.push(newMovie);
    console.log(newMovie);

};

addMovieBtn.addEventListener('click', addMovieHandler)