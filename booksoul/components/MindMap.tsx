import React from 'react';
import { MindMapNode } from '../types';
import { Network } from 'lucide-react';

interface MindMapProps {
  data: MindMapNode;
}

const MindMap: React.FC<MindMapProps> = ({ data }) => {
  return (
    <div className="bg-stone-50 rounded-2xl p-6 md:p-10 border border-stone-200 shadow-inner overflow-x-auto">
      <div className="flex items-center mb-8">
        <Network className="h-6 w-6 text-amber-600 mr-2" />
        <h2 className="text-2xl font-serif-sc font-bold text-stone-800">全书思维脉络</h2>
      </div>
      
      <div className="min-w-[600px] flex flex-col items-center">
        {/* Root Node */}
        <div className="mb-8 relative z-10">
          <div className="bg-stone-800 text-white px-8 py-4 rounded-xl shadow-lg border-2 border-amber-500/50 font-serif-sc text-xl font-bold text-center relative">
            {data.label}
            {/* Connector point bottom */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-stone-300"></div>
          </div>
        </div>

        {/* Level 1 Container */}
        <div className="flex justify-center items-start gap-4 md:gap-8 w-full relative">
          {/* Top connecting horizontal line */}
          <div className="absolute -top-4 left-0 right-0 h-0.5 bg-stone-300 hidden md:block" style={{ 
            left: 'calc(100% / ' + (data.children?.length || 1) * 2 + 'px)', // Rough approximation, better handled with grid but this is purely visual
          }}></div>
          
          {/* We need a better way to draw the connecting bracket. 
             Let's use a simpler approach: Each child has a top line that connects to a central point if possible, 
             or just use a standard tree structure css.
          */}

          {data.children?.map((child, index, arr) => (
            <div key={index} className="flex-1 flex flex-col items-center relative group">
              {/* Connector from parent (Desktop only logic approximation) */}
              <div className="w-full h-4 absolute -top-4 left-0 flex">
                 <div className={`h-full w-[51%] border-t-2 border-stone-300 ${index === 0 ? 'border-l-0 ml-[50%]' : ''} ${index === arr.length - 1 ? 'border-r-0 mr-[50%] w-[50%]' : 'w-[100%]'} ${index !== 0 && index !== arr.length -1 ? 'border-t-2' : ''}`}></div>
              </div>
              
              {/* Vertical connector to node */}
              <div className="h-6 w-0.5 bg-stone-300 mb-0"></div>

              {/* Level 1 Node */}
              <div className="bg-white p-4 rounded-lg shadow-md border-t-4 border-amber-400 w-full max-w-[200px] text-center mb-4 transition-transform hover:-translate-y-1 duration-300">
                <h3 className="font-bold text-stone-800 text-sm md:text-base">{child.label}</h3>
              </div>

              {/* Level 2 Children (List) */}
              {child.children && child.children.length > 0 && (
                <div className="w-full flex flex-col items-center space-y-2 relative">
                  {/* Vertical line passing through */}
                  <div className="absolute top-0 bottom-4 left-1/2 w-px bg-stone-200 -z-10"></div>
                  
                  {child.children.map((subChild, subIndex) => (
                    <div key={subChild.label + subIndex} className="relative bg-stone-100/80 px-3 py-2 rounded text-xs md:text-sm text-stone-600 w-[90%] text-center border border-stone-200">
                      {subChild.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Mobile-friendly fallback note or adjustments could go here, 
          but the flex layout above wraps gracefully enough or scrolls horizontally.
          Let's add a hint for horizontal scroll on small screens.
      */}
      <div className="md:hidden text-center mt-4 text-xs text-stone-400">
        (左右滑动查看完整导图)
      </div>
    </div>
  );
};

export default MindMap;