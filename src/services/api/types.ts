export interface WhapiResponse {
  status: boolean;
  message: string;
  data: {
    phone: string;
    exists: boolean;
    status: string;
  };
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}