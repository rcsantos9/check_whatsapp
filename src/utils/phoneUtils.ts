import { parsePhoneNumber, isValidPhoneNumber as libIsValidPhoneNumber } from 'libphonenumber-js';

export const formatPhoneNumber = (phoneNumber: string): string => {
  try {
    const parsed = parsePhoneNumber(phoneNumber);
    // Whapi expects numbers without the plus sign
    return parsed.format('E.164').replace('+', '');
  } catch (error) {
    throw new Error('Invalid phone number format');
  }
};

export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  try {
    return libIsValidPhoneNumber(phoneNumber);
  } catch {
    return false;
  }
};