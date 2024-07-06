// src/services/api.ts
import axios from 'axios';

export const fetchUsers = async () => {
  const response = await axios.get('https://randomuser.me/api/?results=50');
  return response.data.results;
};
