import React from 'react';
import { BookAnalysis } from '../types';
import QuoteCard from './QuoteCard';
import MindMap from './MindMap';
import { Sparkles, BookText } from 'lucide-react';

interface AnalysisViewProps {
  data: BookAnalysis;
}

const AnalysisView: React.FC<AnalysisViewProps> = ({ data }) => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-12 animate-fade-in pb-20">
      
      {/* Header Info */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-serif-sc font-bold text-stone-900">{data.title}</h1>
        <p className="text-lg text-amber-700 font-medium">Author: {data.author}</p>
        <p className="text-stone-500 max-w-2xl mx-auto italic">{data.summary}</p>
      </div>

      {/* Mind Map Section */}
      <section>
        <MindMap data={data.mindMap} />
      </section>

      {/* Golden Quotes Section */}
      <section>
        <div className="flex items-center mb-6">
          <Sparkles className="h-6 w-6 text-amber-500 mr-2" />
          <h2 className="text-2xl font-serif-sc font-bold text-stone-800">灵魂金句</h2>
          <div className="h-px bg-stone-300 flex-grow ml-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.quotes.map((quote, index) => (
            <QuoteCard key={index} quote={quote} index={index} />
          ))}
        </div>
      </section>

      {/* Extended Interpretation Section */}
      <section className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-stone-200 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-amber-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-stone-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex items-center mb-8">
            <BookText className="h-6 w-6 text-stone-700 mr-2" />
            <h2 className="text-2xl font-serif-sc font-bold text-stone-800">深度·延伸解读</h2>
          </div>
          
          <article className="prose prose-stone prose-lg max-w-none font-serif-sc text-stone-700 leading-8">
            {data.extendedInterpretation.split('\n').map((paragraph, idx) => (
              paragraph.trim() && <p key={idx} className="mb-4 text-justify indent-8">{paragraph}</p>
            ))}
          </article>
          
          <div className="mt-8 flex justify-center">
            <div className="flex items-center text-stone-400 text-sm">
              <span className="w-12 h-px bg-stone-300 mr-2"></span>
              <span>BookSoul AI Analysis</span>
              <span className="w-12 h-px bg-stone-300 ml-2"></span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AnalysisView;