import axios from 'axios';

export async function fetchImages(query, currentPage){

    const BASE_URL = 'https://pixabay.com';
    const END_POINT = '/api/';
    // const API_KEY = '?key=42368566-c5457d3930466887d9437b3aa';
    const API_KEY = '42368566-c5457d3930466887d9437b3aa';
    // const PARAMS_OF_SEARCH = '&image_type=photo&orientation=horizontal&safesearch=true';
    const params = {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page: currentPage,
        per_page: 15,
    }
    const url = `${BASE_URL}${END_POINT}`;
    const res = await axios.get(url, {params});
    console.log(res.data);
    return res.data;
    // const url = this.BASE_URL + this.END_POINT + this.API_KEY + `&q=${encodeURIComponent(query)}` + this.PARAMS_OF_SEARCH;
    // return fetch(url).then(res => res.json());
    
}