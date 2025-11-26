import React, { useState } from 'react';
import { PersonProfile, Gender } from '../types';
import { Calendar, Clock, User, Sparkles } from 'lucide-react';

interface InputFormProps {
  onSubmit: (p1: PersonProfile, p2: PersonProfile) => void;
}

const emptyProfile: PersonProfile = {
  name: '',
  birthDate: '',
  birthTime: '',
  gender: Gender.MALE
};

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [p1, setP1] = useState<PersonProfile>({ ...emptyProfile, gender: Gender.MALE });
  const [p2, setP2] = useState<PersonProfile>({ ...emptyProfile, gender: Gender.FEMALE });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Birth time is now optional
    if (p1.name && p1.birthDate && p2.name && p2.birthDate) {
      onSubmit(p1, p2);
    } else {
      alert("Please fill in Name and Birth Date for both people.");
    }
  };

  const updateProfile = (
    person: 1 | 2,
    field: keyof PersonProfile,
    value: string
  ) => {
    if (person === 1) {
      setP1(prev => ({ ...prev, [field]: value }));
    } else {
      setP2(prev => ({ ...prev, [field]: value }));
    }
  };

  const renderInputs = (personNum: 1 | 2, profile: PersonProfile, label: string) => (
    <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-md shadow-xl">
      <h3 className="font-serif text-xl text-gold-400 mb-6 flex items-center gap-2">
        <span className="bg-gold-400/20 text-gold-400 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border border-gold-400/50">
          {personNum}
        </span>
        {label}
      </h3>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-xs text-indigo-200 uppercase tracking-wider mb-1">Name</label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={profile.name}
              onChange={(e) => updateProfile(personNum, 'name', e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-gold-400/50 transition-colors"
              placeholder="Full Name"
            />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-xs text-indigo-200 uppercase tracking-wider mb-1">Gender</label>
          <div className="flex gap-4">
            {[Gender.MALE, Gender.FEMALE, Gender.OTHER].map((g) => (
              <label key={g} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name={`gender-${personNum}`}
                  checked={profile.gender === g}
                  onChange={() => updateProfile(personNum, 'gender', g)}
                  className="hidden"
                />
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${profile.gender === g ? 'border-gold-400' : 'border-white/30 group-hover:border-white/50'}`}>
                  {profile.gender === g && <span className="w-2 h-2 rounded-full bg-gold-400" />}
                </span>
                <span className={`text-sm ${profile.gender === g ? 'text-white' : 'text-white/50'}`}>{g}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="block text-xs text-indigo-200 uppercase tracking-wider mb-1">Birth Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-4 h-4 text-white/40" />
            <input
              type="date"
              value={profile.birthDate}
              onChange={(e) => updateProfile(personNum, 'birthDate', e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-gold-400/50 transition-colors [color-scheme:dark]"
            />
          </div>
        </div>

        {/* Time */}
        <div>
          <label className="block text-xs text-indigo-200 uppercase tracking-wider mb-1">
            Birth Time <span className="text-white/30 text-[10px] normal-case">(Optional)</span>
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-3 w-4 h-4 text-white/40" />
            <input
              type="time"
              value={profile.birthTime}
              onChange={(e) => updateProfile(personNum, 'birthTime', e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-gold-400/50 transition-colors [color-scheme:dark]"
            />
          </div>
          <p className="text-[10px] text-white/30 mt-1 italic">
            Leave blank if unknown. Accurate time provides a more precise chart.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Enter Birth Details</h2>
        <p className="text-white/60 max-w-lg mx-auto">
          Destiny is written in the stars. We decode ancient Zi Wei charts to find your harmony.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        {renderInputs(1, p1, "First Person")}
        {renderInputs(2, p2, "Second Person")}
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="group relative px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-400 text-mystic-900 font-bold text-lg rounded-full shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all transform hover:-translate-y-1"
        >
          <span className="flex items-center gap-2">
            Reveal Compatibility
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </span>
        </button>
      </div>
    </form>
  );
};

export default InputForm;