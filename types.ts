export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other'
}

export interface PersonProfile {
  name: string;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:mm
  gender: Gender;
}

export interface CompatibilityResult {
  matchScore: number; // 0-100
  title: string; // e.g., "Destined Soulmates"
  summary: string;
  personA_analysis: {
    dominantStar: string;
    personalityTraits: string;
    loveStyle: string;
  };
  personB_analysis: {
    dominantStar: string;
    personalityTraits: string;
    loveStyle: string;
  };
  relationship_dynamics: {
    strengths: string[];
    challenges: string[];
    niHaixiaInsight: string; // Specific advice based on Ni Haixia's style
  };
  verdict: string;
}

export enum AppState {
  LANDING,
  INPUT,
  PAYMENT,
  ANALYZING,
  RESULT
}

// Global declaration for PayPal attached to window
declare global {
  interface Window {
    paypal?: {
      Buttons: (config: {
        createOrder: (data: any, actions: any) => Promise<string>;
        onApprove: (data: any, actions: any) => Promise<void>;
        onError: (err: any) => void;
        style?: {
          layout?: string;
          color?: string;
          shape?: string;
          label?: string;
        };
      }) => {
        render: (selector: string | HTMLElement) => Promise<void>;
      };
    };
  }
}