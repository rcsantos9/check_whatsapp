import { useState, useCallback } from 'react';
import { VerificationResult, BatchVerification } from '../types/verification';
import { verifyWhatsAppNumber, WhatsAppVerificationError } from '../services/whatsapp/whatsappService';

export const useVerification = () => {
  const [verification, setVerification] = useState<BatchVerification>({
    results: [],
    inProgress: false,
    totalProcessed: 0,
  });

  const createVerificationResult = (phoneNumber: string): VerificationResult => ({
    phoneNumber,
    isValid: false,
    status: 'pending',
    timestamp: new Date().toLocaleString(),
  });

  const updateResult = useCallback((
    phoneNumber: string,
    updates: Partial<VerificationResult>
  ) => {
    setVerification(prev => ({
      ...prev,
      results: prev.results.map(r =>
        r.phoneNumber === phoneNumber
          ? { ...r, ...updates }
          : r
      ),
    }));
  }, []);

  const handleSingleVerification = async (phoneNumber: string) => {
    if (!phoneNumber || verification.inProgress) return false;

    const newResult = createVerificationResult(phoneNumber);
    
    setVerification(prev => ({
      ...prev,
      inProgress: true,
      results: [newResult, ...prev.results],
    }));

    try {
      const isValid = await verifyWhatsAppNumber(phoneNumber);
      updateResult(phoneNumber, { isValid, status: 'success' });
      return true;
    } catch (error) {
      const errorMessage = error instanceof WhatsAppVerificationError 
        ? error.message 
        : 'Verification failed';
      
      updateResult(phoneNumber, { 
        status: 'error',
        errorMessage 
      });
      return false;
    } finally {
      setVerification(prev => ({ ...prev, inProgress: false }));
    }
  };

  const handleBatchVerification = async (numbers: string[]) => {
    if (verification.inProgress) return;

    const initialResults = numbers.map(createVerificationResult);

    setVerification({
      results: [...initialResults, ...verification.results],
      inProgress: true,
      totalProcessed: 0,
    });

    for (const number of numbers) {
      try {
        const isValid = await verifyWhatsAppNumber(number);
        setVerification(prev => ({
          ...prev,
          totalProcessed: prev.totalProcessed + 1,
          results: prev.results.map(r =>
            r.phoneNumber === number
              ? { ...r, isValid, status: 'success' }
              : r
          ),
        }));
      } catch (error) {
        const errorMessage = error instanceof WhatsAppVerificationError 
          ? error.message 
          : 'Verification failed';

        setVerification(prev => ({
          ...prev,
          totalProcessed: prev.totalProcessed + 1,
          results: prev.results.map(r =>
            r.phoneNumber === number
              ? { ...r, status: 'error', errorMessage }
              : r
          ),
        }));
      }
    }

    setVerification(prev => ({ ...prev, inProgress: false }));
  };

  return {
    verification,
    handleSingleVerification,
    handleBatchVerification,
  };
};