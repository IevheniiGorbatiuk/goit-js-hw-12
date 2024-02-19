import axios from 'axios';

export async function fetchImages(query, currentPage){

    const BASE_URL = 'https://pixabay.com';
    const END_POINT = '/api/';
    const API_KEY = '42368566-c5457d3930466887d9437b3aa';
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
    return res.data;
}