import React from 'react';

const StarryBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-mystic-900 via-mystic-800 to-black opacity-90"></div>
      <div className="star-bg w-full h-full absolute top-0 left-0"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse" style={{animationDuration: '4s'}}></div>
    </div>
  );
};

export default StarryBackground;