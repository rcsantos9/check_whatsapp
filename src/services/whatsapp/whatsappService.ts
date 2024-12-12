import { apiClient } from '../api/client';
import { WhapiResponse } from '../api/types';
import { API_CONFIG } from '../../config/constants';
import { formatPhoneNumber, isValidPhoneNumber } from '../../utils/phoneUtils';

export class WhatsAppVerificationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WhatsAppVerificationError';
  }
}

export const verifyWhatsAppNumber = async (phoneNumber: string): Promise<boolean> => {
  try {
    if (!isValidPhoneNumber(phoneNumber)) {
      throw new WhatsAppVerificationError('Invalid phone number format');
    }

    const formattedNumber = formatPhoneNumber(phoneNumber);
    
    const response = await apiClient.post<WhapiResponse>(
      API_CONFIG.ENDPOINTS.CHECK_NUMBER,
      { phone: formattedNumber }
    );

    if (!response.data.status) {
      throw new WhatsAppVerificationError(response.data.message);
    }

    return response.data.data.exists;
  } catch (error) {
    if (error instanceof WhatsAppVerificationError) {
      throw error;
    }
    
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new WhatsAppVerificationError(`API Error: ${message}`);
    }

    throw new WhatsAppVerificationError('An unexpected error occurred');
  }
};