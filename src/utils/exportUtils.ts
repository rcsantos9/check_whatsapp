import { VerificationResult } from '../types/verification';

export const exportToCsv = (results: VerificationResult[]): void => {
  const csv = [
    ['Phone Number', 'Status', 'Valid', 'Timestamp'].join(','),
    ...results.map(r => [r.phoneNumber, r.status, r.isValid, r.timestamp].join(','))
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'whatsapp-verification-results.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};