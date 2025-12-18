import React from 'react';
import { Quote } from '../types';
import { Quote as QuoteIcon, Copy } from 'lucide-react';

interface QuoteCardProps {
  quote: Quote;
  index: number;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, index }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(`${quote.text} —— ${quote.context || ''}`);
  };

  return (
    <div className="relative bg-white p-6 rounded-xl shadow-sm border-l-4 border-amber-500 hover:shadow-md transition-all duration-300 group">
      <div className="absolute -top-3 -left-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
        金句 {index + 1}
      </div>
      
      <div className="mb-4">
        <QuoteIcon className="h-8 w-8 text-amber-100 absolute top-4 right-4 transform rotate-180" />
      </div>

      <div className="relative z-10">
        <p className="font-serif-sc text-xl text-stone-800 leading-relaxed mb-3">
          {quote.text}
        </p>
        
        <div className="flex items-center justify-between mt-4 border-t border-stone-100 pt-3">
            <div className="flex flex-col">
                 {quote.context && (
                    <span className="text-stone-500 text-sm italic mb-1">
                    Context: {quote.context}
                    </span>
                )}
                <span className="inline-block bg-stone-100 text-stone-600 text-xs px-2 py-1 rounded-md self-start">
                    #{quote.sentiment}
                </span>
            </div>
            
          <button 
            onClick={handleCopy}
            className="text-stone-400 hover:text-amber-600 transition-colors p-2 rounded-full hover:bg-amber-50"
            title="复制金句"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;