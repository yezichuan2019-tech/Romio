import React from 'react';
import { CompatibilityResult, PersonProfile } from '../types';
import { Star, Heart, ScrollText, AlertTriangle, ShieldCheck } from 'lucide-react';

interface ResultViewProps {
  result: CompatibilityResult;
  p1: PersonProfile;
  p2: PersonProfile;
  onReset: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ result, p1, p2, onReset }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 pb-20 animate-fade-in">
      
      {/* Header Badge */}
      <div className="text-center mb-12">
        <div className="inline-block px-4 py-1 rounded-full border border-gold-400/30 bg-gold-400/10 text-gold-400 text-xs tracking-[0.2em] mb-4">
          ZI WEI DOU SHU REPORT
        </div>
        <h2 className="font-serif text-4xl md:text-5xl text-white mb-2">{result.title}</h2>
        <div className="flex justify-center gap-2 text-white/50 text-sm">
          <span>{p1.name}</span>
          <span>&</span>
          <span>{p2.name}</span>
        </div>
      </div>

      {/* Main Score Card */}
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 blur-xl rounded-3xl"></div>
        <div className="relative bg-mystic-800/80 border border-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-16">
          
          {/* Score Circle */}
          <div className="relative flex-shrink-0">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-white/10"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={440}
                strokeDashoffset={440 - (440 * result.matchScore) / 100}
                className={`text-gold-400 transition-all duration-1000 ease-out`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-serif font-bold text-white">{result.matchScore}%</span>
              <span className="text-xs text-white/50 uppercase">Compatibility</span>
            </div>
          </div>

          {/* Verdict Text */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl text-white font-serif mb-4">{result.verdict}</h3>
            <p className="text-white/70 leading-relaxed italic border-l-2 border-gold-400 pl-4">
              "{result.summary}"
            </p>
          </div>
        </div>
      </div>

      {/* Ni Haixia Insight - The Key Value */}
      <div className="mb-12 bg-gradient-to-br from-indigo-950 to-mystic-900 border border-gold-400/30 p-8 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <ScrollText className="w-32 h-32 text-gold-400" />
        </div>
        <h4 className="font-serif text-xl text-gold-400 mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 fill-gold-400" />
          Master Ni's Insight
        </h4>
        <p className="text-lg text-white/90 leading-loose font-light">
          {result.relationship_dynamics.niHaixiaInsight}
        </p>
      </div>

      {/* Individual Analysis Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Person A */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h4 className="text-lg text-white font-bold mb-4 border-b border-white/10 pb-2">{p1.name}'s Chart</h4>
          <div className="space-y-4">
            <div>
              <span className="text-xs text-white/40 uppercase block mb-1">Dominant Star</span>
              <span className="text-gold-400 font-serif text-xl">{result.personA_analysis.dominantStar}</span>
            </div>
            <div>
              <span className="text-xs text-white/40 uppercase block mb-1">Personality</span>
              <p className="text-sm text-white/70">{result.personA_analysis.personalityTraits}</p>
            </div>
            <div>
              <span className="text-xs text-white/40 uppercase block mb-1">Love Style</span>
              <p className="text-sm text-white/70">{result.personA_analysis.loveStyle}</p>
            </div>
          </div>
        </div>

        {/* Person B */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h4 className="text-lg text-white font-bold mb-4 border-b border-white/10 pb-2">{p2.name}'s Chart</h4>
          <div className="space-y-4">
            <div>
              <span className="text-xs text-white/40 uppercase block mb-1">Dominant Star</span>
              <span className="text-gold-400 font-serif text-xl">{result.personB_analysis.dominantStar}</span>
            </div>
            <div>
              <span className="text-xs text-white/40 uppercase block mb-1">Personality</span>
              <p className="text-sm text-white/70">{result.personB_analysis.personalityTraits}</p>
            </div>
            <div>
              <span className="text-xs text-white/40 uppercase block mb-1">Love Style</span>
              <p className="text-sm text-white/70">{result.personB_analysis.loveStyle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Strengths & Challenges */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="p-6">
          <h4 className="flex items-center gap-2 text-green-400 font-bold mb-4">
            <ShieldCheck className="w-5 h-5" /> Karmic Strengths
          </h4>
          <ul className="space-y-2">
            {result.relationship_dynamics.strengths.map((s, i) => (
              <li key={i} className="flex gap-2 text-white/70 text-sm">
                <span className="text-green-400">•</span> {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6">
          <h4 className="flex items-center gap-2 text-red-400 font-bold mb-4">
            <AlertTriangle className="w-5 h-5" /> Karmic Challenges
          </h4>
          <ul className="space-y-2">
            {result.relationship_dynamics.challenges.map((c, i) => (
              <li key={i} className="flex gap-2 text-white/70 text-sm">
                <span className="text-red-400">•</span> {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action */}
      <div className="flex justify-center">
        <button 
          onClick={onReset}
          className="px-8 py-3 border border-white/20 hover:bg-white/10 rounded-full text-white transition-colors"
        >
          Check Another Couple
        </button>
      </div>

    </div>
  );
};

export default ResultView;