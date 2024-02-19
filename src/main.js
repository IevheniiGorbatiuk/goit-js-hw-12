import { fetchImages } from "./js/pixabay-api";
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
const loadButton = document.querySelector('.btn-load')
// const pixabayAPI = new PixabayAPI();
const showLoader = () => {
    const loader = document.createElement('span');
    loader.classList.add('loader');
    containerDiv.append(loader);
  };

const removeLoader = () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.remove();
    }
};
const showLoadBtn = () =>{
    loadButton.classList.remove("hidden");
    
};
const removeLoadBtn = () =>{
    loadButton.classList.add("hidden");
    console.log(page <= maxPage);
};
const checkBtnVisible = () =>{
    if(page >= maxPage){
        removeLoadBtn();
    }else{
        showLoadBtn();

    }
}
let query;
let page;
let maxPage;

const options = {
    captions: true,
    captionSelector: 'img',
    captionType: 'attr',
    captionsData: 'alt',
    captionPosition: 'bottom',
    animation: 250,
};

form.addEventListener("submit", onFormSubmit);
loadButton.addEventListener("click", loadMore);

async function onFormSubmit(e){
    e.preventDefault();
    query = userInput.value.trim();
    page = 1;

    if(!query){
        showError('Empty field!');
        return;
    }
    showLoader();

    try{
        const data = await fetchImages(query,page);
        if(data.totalHits === 0){
            showError("Sorry, there are no images matching your search query. Please try again!")
        };
        maxPage = Math.ceil(data.totalHits / 15);
        gallery.innerHTML = "";
        renderImgs(data.hits);
        const lightbox = new SimpleLightbox('.gallery a', options);
        lightbox.on('show.sipmlelightbox');
        lightbox.refresh();
    
    }
    catch(err){
        showError(err);
    }
    removeLoader();
    checkBtnVisible();
    form.reset();
};
async function loadMore(e){
    page += 1;
    const data = await fetchImages(query,page);
    renderImgs(data.hits);
    const lightbox = new SimpleLightbox('.gallery a', options);
    lightbox.on('show.sipmlelightbox');
    lightbox.refresh();
    removeLoader();
    checkBtnVisible();
    const heights = gallery.firstElementChild.getBoundingClientRect().height;
    scrollBy({
        behavior: 'smooth',
        top: 2*heights,
      });
    if(page >= maxPage || !data.hits){
        iziToast.info({
            title: '',
            message: "We're sorry, but you've reached the end of search results.",
        });
        removeLoadBtn();
    }
}

function showError(msg) {
    iziToast.error({
        title: 'Error',
        message: msg,
    });
    }