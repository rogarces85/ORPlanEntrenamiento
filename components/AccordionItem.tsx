
import React, { useState } from 'react';
import { TrainingWeek } from '../types';

interface AccordionItemProps {
  week: TrainingWeek;
}

const getIconForSession = (sessionType: string) => {
    const type = sessionType.toLowerCase();
    if (type.includes('descanso')) return <span className="grayscale opacity-50 text-2xl">😴</span>;
    if (type.includes('fondo') || type.includes('largo')) return <span className="text-2xl">🛣️</span>;
    if (type.includes('intervalos') || type.includes('series')) return <span className="text-2xl">⚡️</span>;
    if (type.includes('tempo') || type.includes('umbral')) return <span className="text-2xl">⏱️</span>;
    if (type.includes('recuperación') || type.includes('suave')) return <span className="text-2xl">🧘‍♂️</span>;
    if (type.includes('fartlek')) return <span className="text-2xl">🏞️</span>;
    return <span className="text-2xl">🏃‍♂️</span>;
};


const AccordionItem: React.FC<AccordionItemProps> = ({ week }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white transition-all hover:border-red-600/50 hover:shadow-lg group shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <span className="bg-red-600 text-white text-xs font-black px-3 py-1.5 rounded uppercase tracking-widest shadow-sm">
            Semana {week.semana}
            </span>
            <span className="font-bold text-gray-800 text-sm md:text-base uppercase tracking-tight">
            {week.resumen_semanal}
            </span>
        </div>
        <div className={`w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180 bg-red-600 text-white border-red-600' : 'text-gray-400 group-hover:text-red-600'}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
            </svg>
        </div>
      </button>
      
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-0 border-t border-gray-100">
            <div className="flex flex-col divide-y divide-gray-100">
                {week.dias.map((day, index) => (
                  <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center p-5 hover:bg-gray-50 transition-colors gap-5">
                    
                    {/* Icon & Day */}
                    <div className="flex items-center gap-4 min-w-[150px]">
                        <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm group-hover:border-red-200 transition-colors">
                            {getIconForSession(day.tipo_sesion)}
                        </div>
                        <span className="text-sm font-bold text-gray-900 uppercase">{day.dia}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h4 className="text-sm font-black text-red-600 uppercase tracking-wide">{day.tipo_sesion}</h4>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed font-medium">{day.descripcion_detallada}</p>
                    </div>

                  </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
