import React, { useState } from 'react';
import Header from './components/Header';
import StarryBackground from './components/StarryBackground';
import InputForm from './components/InputForm';
import PaymentModal from './components/PaymentModal';
import ResultView from './components/ResultView';
import { AppState, PersonProfile, CompatibilityResult } from './types';
import { analyzeCompatibility } from './services/geminiService';
import { Loader2 } from 'lucide-react';

const PRICE = 5.00;

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.LANDING);
  const [personA, setPersonA] = useState<PersonProfile | null>(null);
  const [personB, setPersonB] = useState<PersonProfile | null>(null);
  const [result, setResult] = useState<CompatibilityResult | null>(null);

  const handleFormSubmit = (p1: PersonProfile, p2: PersonProfile) => {
    setPersonA(p1);
    setPersonB(p2);
    setState(AppState.PAYMENT);
  };

  const handlePaymentComplete = async () => {
    setState(AppState.ANALYZING);
    try {
      if (personA && personB) {
        const data = await analyzeCompatibility(personA, personB);
        setResult(data);
        setState(AppState.RESULT);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to analyze compatibility. Please check your connection or API Key.");
      setState(AppState.LANDING);
    }
  };

  const handleReset = () => {
    setPersonA(null);
    setPersonB(null);
    setResult(null);
    setState(AppState.LANDING);
  };

  return (
    <div className="min-h-screen relative font-sans text-gray-200 overflow-x-hidden flex flex-col">
      <StarryBackground />
      <Header />

      <main className="flex-grow relative z-10 flex flex-col items-center justify-center">
        
        {/* Landing View */}
        {state === AppState.LANDING && (
          <div className="flex flex-col items-center justify-center text-center px-4 py-20 animate-fade-in">
            <h1 className="font-serif text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-6 drop-shadow-2xl">
              Written in the <br/><span className="text-gold-400">Stars</span>
            </h1>
            <p className="text-lg md:text-xl text-indigo-200 max-w-2xl mb-12 font-light leading-relaxed">
              Discover the hidden dynamics of your relationship using <strong className="text-white">Zi Wei Dou Shu</strong>, 
              the Emperor's Astrology. We apply the teachings of Master Ni Haixia to reveal your karmic compatibility.
            </p>
            <button 
              onClick={() => setState(AppState.INPUT)}
              className="px-10 py-5 bg-gold-500 hover:bg-gold-400 text-mystic-900 font-bold text-xl rounded-full shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all transform hover:scale-105"
            >
              Start Compatibility Test
            </button>
            <p className="mt-4 text-sm text-white/30">No registration required • $5.00 per reading</p>
          </div>
        )}

        {/* Input View */}
        {state === AppState.INPUT && (
          <InputForm onSubmit={handleFormSubmit} />
        )}

        {/* Payment Modal Overlay */}
        {state === AppState.PAYMENT && (
          <PaymentModal 
            price={PRICE} 
            onComplete={handlePaymentComplete}
            onCancel={() => setState(AppState.INPUT)} 
          />
        )}

        {/* Loading / Analyzing View */}
        {state === AppState.ANALYZING && (
          <div className="flex flex-col items-center justify-center p-8 text-center animate-pulse">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gold-400 blur-xl opacity-20 rounded-full"></div>
              <Loader2 className="w-16 h-16 text-gold-400 animate-spin relative z-10" />
            </div>
            <h2 className="font-serif text-2xl text-white mb-2">Consulting the Stars...</h2>
            <p className="text-white/50">Calculating Life Palaces and Star Interactions...</p>
          </div>
        )}

        {/* Results View */}
        {state === AppState.RESULT && result && personA && personB && (
          <ResultView 
            result={result} 
            p1={personA} 
            p2={personB} 
            onReset={handleReset} 
          />
        )}

      </main>

      <footer className="relative z-10 w-full py-8 text-center text-white/20 text-xs border-t border-white/5">
        <p>© {new Date().getFullYear()} DestinyMatch. Based on Traditional Chinese Astrology.</p>
        <p className="mt-1">For Entertainment Purposes Only.</p>
      </footer>
    </div>
  );
};

export default App;