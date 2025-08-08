import React, { useState, useEffect } from 'react';
import { X, RotateCcw, ArrowRight, BookOpen } from 'lucide-react';
import { VocabularyWord } from '../types';

interface FlashcardModalProps {
  isOpen: boolean;
  onClose: () => void;
  words: VocabularyWord[];
}

export function FlashcardModal({ isOpen, onClose, words }: FlashcardModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  }, [isOpen]);

  const handleNext = () => {
    if (words.length === 0) return;
    
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % words.length);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  if (!isOpen || words.length === 0) return null;

  const currentWord = words[currentIndex];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
        
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Flashcards
                </h2>
                <p className="text-sm text-gray-500">
                  Card {currentIndex + 1} of {words.length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRestart}
                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                title="Restart"
              >
                <RotateCcw size={18} />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Flashcard */}
          <div className="p-8">
            <div 
              className="relative bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 min-h-[300px] cursor-pointer transition-all duration-300 hover:shadow-lg border border-indigo-100"
              onClick={handleFlip}
            >
              <div className="flex flex-col items-center justify-center h-full text-center">
                {!isFlipped ? (
                  // Front of card - English word
                  <div className="space-y-4">
                    <div className="text-sm font-medium text-indigo-600 uppercase tracking-wide">
                      English Word
                    </div>
                    <h3 className="text-4xl font-bold text-gray-900 capitalize">
                      {currentWord.word}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Click to see meaning
                    </p>
                  </div>
                ) : (
                  // Back of card - Turkish meaning and example
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-purple-600 uppercase tracking-wide">
                        Turkish Meaning
                      </div>
                      <p className="text-2xl font-semibold text-gray-900 leading-relaxed">
                        {currentWord.meaning}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-purple-600 uppercase tracking-wide">
                        Example Sentence
                      </div>
                      <p className="text-gray-700 leading-relaxed italic">
                        "{currentWord.example}"
                      </p>
                    </div>
                    
                    <p className="text-gray-500 text-sm">
                      Click to flip back
                    </p>
                  </div>
                )}
              </div>
              
              {/* Flip indicator */}
              <div className="absolute top-4 right-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isFlipped ? 'bg-purple-100 text-purple-600' : 'bg-indigo-100 text-indigo-600'
                }`}>
                  <RotateCcw size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between p-6 border-t border-gray-100">
            <div className="text-sm text-gray-500">
              {isFlipped ? 'Click card to flip back' : 'Click card to see meaning'}
            </div>
            
            <button
              onClick={handleNext}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 shadow-sm"
            >
              Next Card
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Progress bar */}
          <div className="px-6 pb-6">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}