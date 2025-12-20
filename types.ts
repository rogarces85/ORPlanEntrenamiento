
export interface PrepRace {
  name: string;
  distance: string;
  date: string;
}

export interface AthleteData {
  name: string;
  age: number;
  experience: 'Principiante' | 'Intermedio' | 'Avanzado';
  isFirstRace: boolean;
  distance: '5K' | '10K' | '21K' | '42K';
  targetTime: string;
  currentPace: string;
  
  // Availability
  trainingDays: number;
  trainingDaysSpecific: string[];
  
  terrain: 'Mixto' | 'Calle' | 'Trotadora';
  
  // Cross Training
  crossTraining: string[];

  // Health
  healthConditions: string;
  injuryHistory: string;

  // Tech
  hasWatch: boolean;
  vo2Max?: string;
  restingHr?: string;
  maxHr?: string;

  prepWeeks: number;
  hasPrepRaces: boolean;
  prepRaces: PrepRace[];
}

export interface HeartRateZone {
  zone: string;
  name: string;
  range: string;
  description: string;
}

export interface PhysiologicalData {
  estimated_lthr: string;
  methodology_explanation: string;
  zones: HeartRateZone[];
}

export interface TrainingDay {
  dia: string;
  tipo_sesion: string;
  descripcion_detallada: string;
}

export interface TrainingWeek {
  semana: number;
  resumen_semanal: string;
  dias: TrainingDay[];
  mensaje_motivacional?: string; 
}

export interface GeneratedPlanResponse {
  physiologicalData?: PhysiologicalData;
  weeks: TrainingWeek[];
}

export type SystemStatus = 'online' | 'offline' | 'error';
