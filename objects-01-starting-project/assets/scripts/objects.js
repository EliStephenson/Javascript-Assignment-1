const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-Btn');

const movies = [];

const renderMovies = () => {
 const movieList = document.getElementById('movie-list');

 movieList.innerHTML = ''; // not ideal because it clears entire list before adding it back
 if (movies.length === 0) {
    movieList.classList.remove('visible');
    return;
 } else {
    movieList.classList.add('visible');
 }
 movieList.innerHTML = '';

 movies.forEach((movie) => {
    const movieEl = document.createElement('li');
    let text = movie.info.title + ' - ';
    for (const key in movie.info) { // get info in the movie
        if (key !== 'title') {// keys are strings
            text = text + `${key}: ${movie.info[key]}`;
        }
    }
    movieEl.textContent = text;
    movieList.append(movieEl)
 });

};

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
    renderMovies();

};

addMovieBtn.addEventListener('click', addMovieHandler)