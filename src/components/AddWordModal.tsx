import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface AddWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (word: string, meaning: string, example: string) => void;
}

export function AddWordModal({ isOpen, onClose, onSubmit }: AddWordModalProps) {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [example, setExample] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!word.trim()) {
      newErrors.word = 'Word is required';
    }
    if (!meaning.trim()) {
      newErrors.meaning = 'Meaning is required';
    }
    if (!example.trim()) {
      newErrors.example = 'Example sentence is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(word.trim(), meaning.trim(), example.trim());
      setWord('');
      setMeaning('');
      setExample('');
      setErrors({});
      onClose();
    }
  };

  const handleClose = () => {
    setWord('');
    setMeaning('');
    setExample('');
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
          onClick={handleClose}
        />
        
        <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 transform transition-all">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Add New Word
            </h2>
            <button
              onClick={handleClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="word" className="block text-sm font-medium text-gray-700 mb-2">
                Word
              </label>
              <input
                type="text"
                id="word"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.word 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="Enter the word"
              />
              {errors.word && (
                <p className="mt-1 text-sm text-red-600">{errors.word}</p>
              )}
            </div>

            <div>
              <label htmlFor="meaning" className="block text-sm font-medium text-gray-700 mb-2">
                English Meaning
              </label>
              <textarea
                id="meaning"
                value={meaning}
                onChange={(e) => setMeaning(e.target.value)}
                rows={3}
                className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                  errors.meaning 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="Enter the English meaning"
              />
              {errors.meaning && (
                <p className="mt-1 text-sm text-red-600">{errors.meaning}</p>
              )}
            </div>

            <div>
              <label htmlFor="example" className="block text-sm font-medium text-gray-700 mb-2">
                Example Sentence
              </label>
              <textarea
                id="example"
                value={example}
                onChange={(e) => setExample(e.target.value)}
                rows={3}
                className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                  errors.example 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="Enter an example sentence using the word"
              />
              {errors.example && (
                <p className="mt-1 text-sm text-red-600">{errors.example}</p>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                Add Word
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}