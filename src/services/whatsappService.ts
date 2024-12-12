import axios from 'axios';
import { API_CONFIG } from '../config/api';
import { formatPhoneNumber, isValidPhoneNumber } from '../utils/phoneUtils';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_CONFIG.API_KEY}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export interface WhapiResponse {
  status: boolean;
  message: string;
  data: {
    phone: string;
    exists: boolean;
    status: string;
  };
}

export const verifyWhatsAppNumber = async (phoneNumber: string): Promise<boolean> => {
  try {
    if (!isValidPhoneNumber(phoneNumber)) {
      throw new Error('Invalid phone number format');
    }

    const formattedNumber = formatPhoneNumber(phoneNumber);
    const response = await api.post<WhapiResponse>(
      API_CONFIG.ENDPOINTS.CHECK_NUMBER,
      { phone: formattedNumber }
    );

    if (!response.data.status) {
      throw new Error(response.data.message);
    }

    return response.data.data.exists;
  } catch (error) {
    if (error instanceof Error) {
      console.error('WhatsApp verification error:', error.message);
    }
    throw error;
  }
};