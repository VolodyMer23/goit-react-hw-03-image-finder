import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '10379430-832318120c737863729cf9e40';

export const fetchImages = async (query, page) => {
  const response = await axios.get(
    `?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
  );
  console.log(response.data);
  return response.data;
};

export default fetchImages;