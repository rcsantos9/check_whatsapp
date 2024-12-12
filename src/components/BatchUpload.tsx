import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface BatchUploadProps {
  onUpload: (numbers: string[]) => void;
  disabled?: boolean;
}

export const BatchUpload: React.FC<BatchUploadProps> = ({ onUpload, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const numbers = text.split('\n').map(n => n.trim()).filter(Boolean);
    onUpload(numbers);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.csv"
        onChange={handleFileUpload}
        className="hidden"
        disabled={disabled}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled}
        className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Upload className="h-5 w-5" />
        Upload Numbers
      </button>
      <p className="text-sm text-gray-500">Upload .txt or .csv file with one number per line</p>
    </div>
  );
};