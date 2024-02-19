export class PixabayAPI{
    constructor() {
        this.BASE_URL = 'https://pixabay.com';
        this.END_POINT = '/api/';
        this.API_KEY = '?key=42368566-c5457d3930466887d9437b3aa';
        this.PARAMS_OF_SEARCH = '&image_type=photo&orientation=horizontal&safesearch=true';
    }
    getImages(query){
        const url = this.BASE_URL + this.END_POINT + this.API_KEY + `&q=${encodeURIComponent(query)}` + this.PARAMS_OF_SEARCH;
        return fetch(url).then(res => res.json());
    }
}