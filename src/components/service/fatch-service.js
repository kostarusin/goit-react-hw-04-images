import axios from 'axios';

const API_KEY = '37757001-b13a3b98fcf42c50e87778634';

export const fatchImages = async (query, page, perPage) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?key=${API_KEY}&q=${query}&page=${page}&per_page=${perPage}`
  );

  return data;
};
