import React, { useState } from 'react';
import { Search, BookOpen, UserPen } from 'lucide-react';

interface InputSectionProps {
  onAnalyze: (book: string, author: string) => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, isLoading }) => {
  const [book, setBook] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (book.trim()) {
      onAnalyze(book, author);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-stone-200 overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="bg-stone-800 p-6 text-center">
        <h2 className="text-white font-serif-sc text-2xl tracking-wide mb-2">探寻书中真谛</h2>
        <p className="text-stone-300 text-sm">输入书名与作者，获取专属金句与深度解读</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="space-y-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BookOpen className="h-5 w-5 text-stone-400 group-focus-within:text-amber-600 transition-colors" />
            </div>
            <input
              type="text"
              value={book}
              onChange={(e) => setBook(e.target.value)}
              placeholder="书名 (例如: 百年孤独)"
              className="block w-full pl-10 pr-3 py-3 border border-stone-300 rounded-lg leading-5 bg-stone-50 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
              required
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserPen className="h-5 w-5 text-stone-400 group-focus-within:text-amber-600 transition-colors" />
            </div>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="作者 (可选，例如: 加西亚·马尔克斯)"
              className="block w-full pl-10 pr-3 py-3 border border-stone-300 rounded-lg leading-5 bg-stone-50 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !book.trim()}
          className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg text-base font-medium text-white shadow-md transition-all duration-300 ${
            isLoading || !book.trim()
              ? 'bg-stone-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              正在研读...
            </span>
          ) : (
            <span className="flex items-center">
              <Search className="h-5 w-5 mr-2" />
              开始解读
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default InputSection;