import axios from 'axios';
import { API_CONFIG } from '../../config/constants';

export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_CONFIG.API_KEY}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});