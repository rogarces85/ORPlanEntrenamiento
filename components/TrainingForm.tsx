
import React, { useState, useEffect } from 'react';
import { AthleteData, PrepRace } from '../types';

interface TrainingFormProps {
  onSubmit: (data: AthleteData) => void;
  isLoading: boolean;
}

const DAYS_OF_WEEK = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const TrainingForm: React.FC<TrainingFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<any>({
    name: '',
    age: '',
    experience: 'Intermedio',
    isFirstRace: false,
    distance: '21K',
    targetTime: '',
    currentPace: '',
    trainingDays: 3,
    trainingDaysSpecific: ['Lunes', 'Miércoles', 'Sábado'],
    terrain: 'Calle',
    crossTraining: [],
    healthConditions: 'Ninguna relevante',
    injuryHistory: 'Ninguna relevante',
    prepWeeks: 12,
    hasWatch: false,
    vo2Max: '',
    restingHr: '',
    maxHr: '',
    hasPrepRaces: false,
    prepRaces: []
  });

  const [newPrepRace, setNewPrepRace] = useState<PrepRace>({ name: '', distance: '', date: '' });

  useEffect(() => {
    setFormData((prev: any) => ({
        ...prev,
        trainingDays: prev.trainingDaysSpecific.length
    }));
  }, [formData.trainingDaysSpecific]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev: any) => ({ ...prev, [name]: val }));
  };

  const toggleDay = (day: string) => {
    setFormData((prev: any) => {
        const exists = prev.trainingDaysSpecific.includes(day);
        if (exists && prev.trainingDaysSpecific.length > 1) {
            return { ...prev, trainingDaysSpecific: prev.trainingDaysSpecific.filter((d: string) => d !== day) };
        } else if (!exists) {
            return { ...prev, trainingDaysSpecific: [...prev.trainingDaysSpecific, day] };
        }
        return prev;
    });
  };

  const addPrepRace = () => {
    if (newPrepRace.name && newPrepRace.distance && newPrepRace.date) {
        setFormData((prev: any) => ({ ...prev, prepRaces: [...prev.prepRaces, newPrepRace] }));
        setNewPrepRace({ name: '', distance: '', date: '' });
    }
  };

  const removePrepRace = (index: number) => {
      setFormData((prev: any) => ({
          ...prev,
          prepRaces: prev.prepRaces.filter((_: any, i: number) => i !== index)
      }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
        ...formData,
        age: Number(formData.age),
        prepWeeks: Number(formData.prepWeeks)
    });
  };

  const inputClasses = "w-full bg-gray-50 border border-gray-200 text-gray-900 text-base rounded-xl p-4 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all placeholder-gray-400 outline-none";
  const labelClasses = "block text-[11px] font-black text-gray-400 mb-2 uppercase tracking-widest";
  const sectionClasses = "bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm mb-6 transition-shadow hover:shadow-md";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pb-20 max-w-2xl mx-auto xl:mx-0">
        
        {/* Step 1: Perfil Básico */}
        <div className={sectionClasses}>
            <div className="flex items-center gap-4 mb-8">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-black italic">1</span>
                <h2 className="text-2xl font-black uppercase italic tracking-tighter">Atleta <span className="text-red-600">Core</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className={labelClasses}>Identificación Atleta</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClasses} required placeholder="Nombre y Apellido" />
                </div>
                <div>
                    <label className={labelClasses}>Edad Biológica</label>
                    <input type="number" name="age" value={formData.age} onChange={handleChange} className={inputClasses} required />
                </div>
                <div>
                    <label className={labelClasses}>Ciclo de Preparación (Semanas)</label>
                    <input type="number" name="prepWeeks" value={formData.prepWeeks} onChange={handleChange} className={inputClasses} required min="4" max="24" />
                </div>
            </div>
        </div>

        {/* Step 2: Objetivo Técnico */}
        <div className={sectionClasses}>
            <div className="flex items-center gap-4 mb-8">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-black italic">2</span>
                <h2 className="text-2xl font-black uppercase italic tracking-tighter">Misión <span className="text-red-600">Race Day</span></h2>
            </div>
            <div className="space-y-6">
                <div className="grid grid-cols-4 gap-2">
                    {['5K', '10K', '21K', '42K'].map(d => (
                        <button 
                          key={d} 
                          type="button" 
                          onClick={() => setFormData({...formData, distance: d})} 
                          className={`py-3 rounded-lg font-black transition-all text-xs tracking-tighter ${formData.distance === d ? 'bg-red-600 text-white shadow-lg shadow-red-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        >
                          {d}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={labelClasses}>Tiempo Objetivo</label>
                        <input type="text" name="targetTime" value={formData.targetTime} onChange={handleChange} className={inputClasses} placeholder="03:30:00" required />
                    </div>
                    <div>
                        <label className={labelClasses}>Ritmo Actual (/km)</label>
                        <input type="text" name="currentPace" value={formData.currentPace} onChange={handleChange} className={inputClasses} placeholder="05:30" required />
                    </div>
                </div>
                <div>
                    <label className={labelClasses}>Nivel de Experiencia</label>
                    <select name="experience" value={formData.experience} onChange={handleChange} className={inputClasses}>
                        <option value="Principiante">Principiante (0-2 años)</option>
                        <option value="Intermedio">Intermedio (2-5 años)</option>
                        <option value="Avanzado">Avanzado (+5 años / Federado)</option>
                    </select>
                </div>
            </div>
        </div>

        {/* Step 3: Biometría & Tecnología */}
        <div className={sectionClasses}>
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-black italic">3</span>
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter">Biometría <span className="text-red-600">Tech</span></h2>
                </div>
                <label className="relative inline-flex items-center cursor-pointer scale-90">
                    <input type="checkbox" name="hasWatch" checked={formData.hasWatch} onChange={handleChange} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                </label>
            </div>
            {formData.hasWatch ? (
                <div className="grid grid-cols-3 gap-3 animate-slideDown">
                    <div>
                        <label className="text-[9px] font-black text-gray-400 uppercase block mb-1">FC Máx</label>
                        <input type="number" name="maxHr" value={formData.maxHr} onChange={handleChange} className={inputClasses} placeholder="190" />
                    </div>
                    <div>
                        <label className="text-[9px] font-black text-gray-400 uppercase block mb-1">FC Reposo</label>
                        <input type="number" name="restingHr" value={formData.restingHr} onChange={handleChange} className={inputClasses} placeholder="50" />
                    </div>
                    <div>
                        <label className="text-[9px] font-black text-gray-400 uppercase block mb-1">VO2 Max</label>
                        <input type="number" name="vo2Max" value={formData.vo2Max} onChange={handleChange} className={inputClasses} placeholder="55" />
                    </div>
                </div>
            ) : (
                <p className="text-xs text-gray-400 italic font-medium">Se calcularán zonas de esfuerzo basadas en RPE (Esfuerzo Percibido).</p>
            )}
        </div>

        {/* Step 4: Disponibilidad */}
        <div className={sectionClasses}>
            <div className="flex items-center gap-4 mb-8">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-black italic">4</span>
                <h2 className="text-2xl font-black uppercase italic tracking-tighter">Slots <span className="text-red-600">Tempo</span></h2>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {DAYS_OF_WEEK.map(d => (
                    <button 
                      key={d} 
                      type="button" 
                      onClick={() => toggleDay(d)} 
                      className={`py-3 rounded-lg font-black text-[10px] uppercase tracking-tighter transition-all ${formData.trainingDaysSpecific.includes(d) ? 'bg-black text-white shadow-lg' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                    >
                      {d.substring(0,2)}
                    </button>
                ))}
            </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading} 
          className="w-full bg-red-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-red-100 text-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-3 transform transition hover:scale-[1.01] active:scale-95"
        >
            {isLoading ? "CALCULANDO CARGAS..." : "SINCRONIZAR ENTRENADOR IA ⚡"}
        </button>
    </form>
  );
};

export default TrainingForm;
