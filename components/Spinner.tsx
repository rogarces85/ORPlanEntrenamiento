import React, { useState, useEffect } from 'react';

const LOADING_MESSAGES = [
  "Iniciando Coach IA...",
  "Calculando umbrales de lactato...",
  "Diseñando bloques de periodización...",
  "Ajustando series e intervalos...",
  "Sincronizando con carreras previas...",
  "Optimizando picos de forma...",
  "Personalizando zonas de ritmo...",
  "Finalizando tu plan maestro..."
];

const Spinner: React.FC = () => {
  const [msgIdx, setMsgIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMsgIdx((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);

    const progTimer = setInterval(() => {
      setProgress((prev) => (prev < 95 ? prev + (95 - prev) * 0.1 : 95));
    }, 800);

    return () => {
      clearInterval(msgTimer);
      clearInterval(progTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-xl flex items-center justify-center p-6 animate-fadeIn">
      <div className="max-w-md w-full bg-white rounded-[3.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.1)] border border-gray-50 p-12 text-center relative overflow-hidden">
        
        {/* Animated Background Pulse */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-60 animate-pulse"></div>

        {/* High Tech Loader UI */}
        <div className="relative w-40 h-40 mx-auto mb-10">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="80" cy="80" r="75" stroke="#f3f4f6" strokeWidth="6" fill="transparent" />
            <circle 
              cx="80" cy="80" r="75" 
              stroke="#dc2626" 
              strokeWidth="8" 
              fill="transparent" 
              strokeDasharray="471" 
              strokeDashoffset={471 - (471 * progress) / 100}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="relative">
                <div className="absolute inset-0 bg-red-600 rounded-2xl blur-lg opacity-20 animate-pulse"></div>
                <div className="w-16 h-16 bg-red-600 rounded-3xl flex items-center justify-center text-white text-3xl shadow-xl animate-bounce">
                    🏃
                </div>
             </div>
          </div>
          
          {/* Speed Lines */}
          <div className="absolute -right-4 top-1/2 w-8 h-1 bg-red-200 rounded-full animate-ping opacity-50"></div>
          <div className="absolute -left-2 top-1/3 w-6 h-1 bg-red-100 rounded-full animate-ping delay-150 opacity-40"></div>
        </div>

        <div className="space-y-6">
          <div className="inline-block px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-2 animate-pulse">
            Osorno Runner IA Engine
          </div>
          
          <div className="h-16 flex items-center justify-center">
            <h3 className="text-2xl font-black text-gray-900 uppercase italic tracking-tighter leading-tight animate-fadeIn" key={msgIdx}>
              {LOADING_MESSAGES[msgIdx]}
            </h3>
          </div>

          <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-1000 shadow-[0_0_15px_rgba(220,38,38,0.4)]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Construyendo tu mejor versión...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Spinner;