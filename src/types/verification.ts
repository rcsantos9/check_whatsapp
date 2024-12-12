export interface VerificationResult {
  phoneNumber: string;
  isValid: boolean;
  status: 'pending' | 'success' | 'error';
  timestamp: string;
  errorMessage?: string;
}

export interface BatchVerification {
  results: VerificationResult[];
  inProgress: boolean;
  totalProcessed: number;
}