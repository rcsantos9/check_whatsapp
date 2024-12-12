// Simulated API call - Replace with actual 2chat API integration
export const verifyWhatsAppNumber = async (phoneNumber: string): Promise<boolean> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simulate verification result
  return Math.random() > 0.3;
};