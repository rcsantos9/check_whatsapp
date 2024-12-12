import React from 'react';
import { Check, X, Clock, AlertCircle } from 'lucide-react';
import type { VerificationResult } from '../types/verification';

interface ResultsTableProps {
  results: VerificationResult[];
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  if (results.length === 0) return null;

  return (
    <div className="mt-6 overflow-hidden border border-gray-200 rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Details
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Timestamp
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {results.map((result, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {result.phoneNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  {result.status === 'pending' && <Clock className="h-5 w-5 text-yellow-500" />}
                  {result.status === 'success' && (
                    result.isValid ? 
                      <Check className="h-5 w-5 text-green-500" /> :
                      <X className="h-5 w-5 text-red-500" />
                  )}
                  {result.status === 'error' && <AlertCircle className="h-5 w-5 text-red-500" />}
                  {result.status === 'success' ? (result.isValid ? 'Valid' : 'Invalid') : result.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {result.errorMessage && (
                  <span className="text-red-600">{result.errorMessage}</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {result.timestamp}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};