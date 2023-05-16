import axios from 'axios';

const API_KEY = '34734183-f822af85241d99cf90dda111a';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const searchParams = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 12,
});

export const fetch = async (searchQuery, page) => {
  const response = await axios.get(
    `?q=${searchQuery}&page=${page}&key=${API_KEY}&${searchParams}`
  );
  return response.data;
};

