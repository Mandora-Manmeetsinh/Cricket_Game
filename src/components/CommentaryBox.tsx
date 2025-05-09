import React, { useEffect, useRef } from 'react';

interface CommentaryBoxProps {
  commentary: string[];
}

function CommentaryBox({ commentary }: CommentaryBoxProps) {
  const commentaryEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (commentaryEndRef.current) {
      commentaryEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [commentary]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b pb-1">Match Commentary</h3>
      <div className="max-h-40 overflow-y-auto">
        {commentary.length === 0 ? (
          <p className="text-gray-500 italic">The match is about to begin...</p>
        ) : (
          <ul className="space-y-2">
            {commentary.map((comment, index) => (
              <li 
                key={index} 
                className={`text-sm p-2 rounded-md ${
                  index === commentary.length - 1 
                    ? 'bg-yellow-100 font-medium' 
                    : 'bg-gray-50'
                }`}
              >
                {comment}
              </li>
            ))}
            <div ref={commentaryEndRef} />
          </ul>
        )}
      </div>
    </div>
  );
}

export default CommentaryBox;