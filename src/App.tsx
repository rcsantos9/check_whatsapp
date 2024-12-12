import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { NumberInput } from './components/NumberInput';
import { BatchUpload } from './components/BatchUpload';
import { ResultsTable } from './components/ResultsTable';
import { ProgressBar } from './components/ProgressBar';
import { useVerification } from './hooks/useVerification';
import { exportToCsv } from './utils/exportUtils';

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const { verification, handleSingleVerification, handleBatchVerification } = useVerification();

  const handleSubmit = async () => {
    const success = await handleSingleVerification(phoneNumber);
    if (success) {
      setPhoneNumber('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            WhatsApp Number Verification
          </h1>

          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Verify Single Number
            </h2>
            <NumberInput
              value={phoneNumber}
              onChange={setPhoneNumber}
              onSubmit={handleSubmit}
              disabled={verification.inProgress}
            />
          </div>

          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Batch Verification
            </h2>
            <BatchUpload
              onUpload={handleBatchVerification}
              disabled={verification.inProgress}
            />
          </div>

          {verification.inProgress && (
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <ProgressBar
                total={verification.results.filter(r => r.status === 'pending').length + verification.totalProcessed}
                current={verification.totalProcessed}
              />
            </div>
          )}

          {verification.results.length > 0 && (
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Results</h2>
                <button
                  onClick={() => exportToCsv(verification.results)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Download className="h-4 w-4" />
                  Export CSV
                </button>
              </div>
              <ResultsTable results={verification.results} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;