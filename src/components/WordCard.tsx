import React from 'react';
import { Trash2, Calendar } from 'lucide-react';
import { VocabularyWord } from '../types';

interface WordCardProps {
  word: VocabularyWord;
  onDelete: (id: string) => void;
}

export function WordCard({ word, onDelete }: WordCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900 capitalize">
          {word.word}
        </h3>
        <button
          onClick={() => onDelete(word.id)}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
          aria-label="Delete word"
        >
          <Trash2 size={18} />
        </button>
      </div>
      
      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
            Meaning
          </h4>
          <p className="text-gray-700 leading-relaxed">
            {word.meaning}
          </p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
            Example
          </h4>
          <p className="text-gray-700 leading-relaxed italic">
            "{word.example}"
          </p>
        </div>
        
        <div className="flex items-center text-xs text-gray-400 pt-2 border-t border-gray-100">
          <Calendar size={14} className="mr-1" />
          Added on {word.dateAdded}
        </div>
      </div>
    </div>
  );
}