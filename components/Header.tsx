import React from 'react';
import { Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="relative z-10 w-full py-6 px-8 flex justify-between items-center border-b border-white/10 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-gold-400" />
        <h1 className="font-serif text-xl md:text-2xl text-white tracking-widest uppercase">
          Destiny<span className="text-gold-400">Match</span>
        </h1>
      </div>
      <div className="hidden md:block text-xs text-white/50 tracking-wider">
        ANCIENT WISDOM • MODERN LOVE
      </div>
    </header>
  );
};

export default Header;