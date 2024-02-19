import {gallery} from "../main";
function templateImg({webformatURL, largeImageURL, tags, likes, views, comments, downloads}){
    return `<li class="gallery-item"><a href="${largeImageURL}">
    <img class="gallery-image" src="${webformatURL}" alt="${tags}"></a>
    <p><b>Likes: </b>${likes}</p>
    <p><b>Views: </b>${views}</p>
    <p><b>Comments: </b>${comments}</p>
    <p><b>Downloads: </b>${downloads}</p>
    </li>`;
};
function templateImgs(imgs){
    return imgs.map(templateImg).join('');
};
export function renderImgs(imgs){
    const markup = templateImgs(imgs);
    gallery.insertAdjacentHTML("beforeend", markup);
}