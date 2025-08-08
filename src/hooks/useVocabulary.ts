import { useState, useEffect } from 'react';
import { VocabularyWord } from '../types';

const STORAGE_KEY = 'vocabulary-words';

export function useVocabulary() {
  const [words, setWords] = useState<VocabularyWord[]>([]);

  useEffect(() => {
    const savedWords = localStorage.getItem(STORAGE_KEY);
    if (savedWords) {
      try {
        setWords(JSON.parse(savedWords));
      } catch (error) {
        console.error('Error parsing saved words:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const saveWords = (newWords: VocabularyWord[]) => {
    setWords(newWords);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newWords));
  };

  const addWord = (word: string, meaning: string, example: string) => {
    const newWord: VocabularyWord = {
      id: Date.now().toString(),
      word,
      meaning,
      example,
      dateAdded: new Date().toLocaleDateString()
    };
    
    const updatedWords = [newWord, ...words];
    saveWords(updatedWords);
  };

  const deleteWord = (id: string) => {
    const updatedWords = words.filter(word => word.id !== id);
    saveWords(updatedWords);
  };

  return {
    words,
    addWord,
    deleteWord
  };
}