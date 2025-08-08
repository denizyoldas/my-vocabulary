import React, { useState } from 'react';
import { BookOpen, Plus, Search, Zap } from 'lucide-react';
import { WordCard } from './components/WordCard';
import { AddWordModal } from './components/AddWordModal';
import { FlashcardModal } from './components/FlashcardModal';
import { useVocabulary } from './hooks/useVocabulary';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFlashcardOpen, setIsFlashcardOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { words, addWord, deleteWord } = useVocabulary();

  const filteredWords = words.filter(word =>
    word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    word.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-xl">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  My Vocabulary
                </h1>
                <p className="text-sm text-gray-500">
                  {words.length} word{words.length !== 1 ? 's' : ''} saved
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {words.length > 0 && (
                <button
                  onClick={() => setIsFlashcardOpen(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Zap size={18} />
                  Start Flashcards
                </button>
              )}
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center gap-2 shadow-sm"
              >
                <Plus size={18} />
                Add Word
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        {words.length > 0 && (
          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search words or meanings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
        )}

        {/* Words Grid */}
        {filteredWords.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWords.map((word) => (
              <WordCard
                key={word.id}
                word={word}
                onDelete={deleteWord}
              />
            ))}
          </div>
        ) : words.length > 0 ? (
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No words found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms
            </p>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-blue-50 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <BookOpen className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Start Building Your Vocabulary
            </h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
              Add your first word to begin creating your personal vocabulary collection. 
              Each word you add will help expand your language skills.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 mx-auto shadow-sm"
            >
              <Plus size={20} />
              Add Your First Word
            </button>
          </div>
        )}
      </main>

      {/* Modal */}
      <AddWordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addWord}
      />
      
      {/* Flashcard Modal */}
      <FlashcardModal
        isOpen={isFlashcardOpen}
        onClose={() => setIsFlashcardOpen(false)}
        words={words}
      />
    </div>
  );
}

export default App;