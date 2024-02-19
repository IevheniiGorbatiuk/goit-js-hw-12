import { PixabayAPI } from "./js/pixabay-api";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
import { renderImgs } from "./js/render-functions";

const form = document.querySelector('.form');
export const gallery = document.querySelector('.gallery');
const userInput = document.querySelector('input');
const containerDiv = document.querySelector('.container');
const pixabayAPI = new PixabayAPI();
const showLoader = () => {
    const loader = document.createElement('span');
    loader.classList.add('loader');
    containerDiv.append(loader);
  };

const options = {
    captions: true,
    captionSelector: 'img',
    captionType: 'attr',
    captionsData: 'alt',
    captionPosition: 'bottom',
    animation: 250,
};

const removeLoader = () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.remove();
    }
  };

form.addEventListener("submit", e =>{
    showLoader();
    e.preventDefault();
    const query = userInput.value;

    pixabayAPI
    .getImages(query)
    .then(data => {
        if (data.hits.length === 0) {
          iziToast.error({
            title: '',
            backgroundColor: '#EF4040',
            message:
              'Sorry, there are no images matching your search query. Please try again!',
          });
          gallery.innerHTML ="";
          form.reset();
        } else {
            renderImgs(data);
            const lightbox = new SimpleLightbox('.gallery a', options);
            lightbox.on('show.sipmlelightbox');
            lightbox.refresh();
            form.reset();
            }
        })
    .catch(error => {
        console.log(error);
    })
    .finally(() =>{
        removeLoader();
    
    });
});