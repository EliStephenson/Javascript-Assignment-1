const addMovieModal = document.getElementById('add-modal');
// const addMovieModal = document.querySelector('#add-modal)
// const addMovieModal = document.body.children[1]
const addMovieModalButton = document.querySelector('header button');
// const addMovieModalButton = document.querySelector('header').lastElementChild
const modalBackdrop = document.getElementById('backdrop');
// const modalBackdrop =document.body.firstElementChild
const modalCancelButton = addMovieModal.querySelector('.btn--passive');
const modalAddButton = modalCancelButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
//const userInputs = addMovieModal.getElementsByTagName('input');
const entryTextSection = document.getElementById('entry-text');
const listRoot = document.getElementById('movie-list');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

const toggleBackdrop = () => {
    modalBackdrop.classList.toggle('visible');
    clearMovieInput();
  };

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
};

const cancelMovieDeletion = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
};

const deleteMovie = (movieId) => {
    let movieIndex = 0;
    for (const movie of movies) {
      if (movie.id === movieId) {
        break;
      }
      movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    cancelMovieDeletion();
    updateUI();
};



const deleteMovieHandler = (movieId) => {
    const deleteMovieModal = document.getElementById('delete-modal')
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();

    const cancelDeleteBtn = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeleteBtn = deleteMovieModal.querySelector('.btn--danger');

    confirmDeleteBtn.replaceWith(confirmDeleteBtn.cloneNode(true));

    confirmDeleteBtn = deleteMovieModal.querySelector('.btn--danger');

    cancelDeleteBtn.removeEventListener('click', cancelMovieDeletion);
    cancelDeleteBtn.addEventListener('click', cancelMovieDeletion);
    confirmDeleteBtn.addEventListener('click',deleteMovie.bind(null,movieId));
    

};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
    <div class = "movie-element__image">
        <img src="${imageUrl}" alt="${title}">
    </div>
    <div class = "movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars </p>
    </div>
    `;
  newMovieElement.addEventListener('click', deleteMovieHandler.bind(null,id));
  const listRoot = document.getElementById('movie-list');
  listRoot.append(newMovieElement);
};

const clearMovieInput = () => {
  for (const userInput of userInputs) {
    userInput.value = '';
  }
};

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
}

const showMovieModal = () => {
  addMovieModal.classList.add('visible');
  toggleBackdrop();
};

const backdropClickHandler = () => {
  closeMovieModal();
  cancelMovieDeletion();
  clearMovieInput();
};

const cancelMovieModalHandler = () => {
  closeMovieModal();
  toggleBackdrop();
  clearMovieInput();
};

const addMovieModalHandler = () => {
  const titleValue = userInputs[0].value;
  const imgUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === '' ||
    imgUrlValue.trim() === '' ||
    ratingValue.trim() === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert('please enter valid values (rating between 1 and 5)');
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imgUrlValue,
    rating: ratingValue,
  };

  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  toggleBackdrop();
  clearMovieInput();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
  updateUI();
};

addMovieModalButton.addEventListener('click', showMovieModal);
modalBackdrop.addEventListener('click', backdropClickHandler);
modalCancelButton.addEventListener('click', cancelMovieModalHandler);
modalAddButton.addEventListener('click', addMovieModalHandler);
