
import React, { forwardRef } from 'react';
import { GeneratedPlanResponse } from '../types';
import AccordionItem from './AccordionItem';

interface PlanDisplayProps {
  result: GeneratedPlanResponse;
  onExportPDF: () => void;
}

const PlanDisplay = forwardRef<HTMLDivElement, PlanDisplayProps>(({ result, onExportPDF }, ref) => {
  const { weeks, physiologicalData } = result;
  const lastWeek = weeks[weeks.length - 1];

  return (
    <section className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-2xl relative animate-fadeIn overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-50 rounded-full blur-[100px] -z-10 opacity-40"></div>
      
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-12 gap-8 border-b border-gray-100 pb-10">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-1 bg-red-600"></span>
                <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.4em]">Engine v3.1</span>
            </div>
            <h2 className="text-5xl font-black italic uppercase leading-none tracking-tighter text-gray-900">
                Data <span className="text-red-600">Driven</span> Plan
            </h2>
            <p className="text-gray-400 text-xs font-bold mt-4 tracking-widest uppercase flex items-center gap-2">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"></path></svg>
                Fisiología Aplicada • Joe Friel Methodology
            </p>
        </div>
        <button 
          onClick={onExportPDF} 
          className="bg-black text-white font-black py-4 px-10 rounded-xl shadow-2xl hover:bg-red-600 transition-all flex items-center justify-center gap-4 group"
        >
          <span className="uppercase text-xs tracking-widest">Generar Reporte PDF</span>
          <svg className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
        </button>
      </div>

      <div ref={ref} className="space-y-12">
        
        {physiologicalData && (
             <div className="bg-[#0f1115] rounded-[2rem] p-8 text-white relative shadow-2xl border border-white/5">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-10 gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-1.5 h-10 bg-red-600 rounded-full"></div>
                        <div>
                            <h3 className="text-2xl font-black italic uppercase tracking-tighter">Zonas de Potencia Cardíaca</h3>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Calculadas mediante LTHR Dinámico</p>
                        </div>
                    </div>
                    <div className="bg-red-600/10 border border-red-600/30 px-6 py-3 rounded-xl backdrop-blur-md">
                        <span className="text-[9px] block font-black uppercase tracking-widest text-red-400">Umbral Lactato (Est.)</span>
                        <span className="text-3xl font-black text-red-500">{physiologicalData.estimated_lthr} <span className="text-sm">BPM</span></span>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {physiologicalData.zones.map((z, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-xl hover:border-red-600/30 transition-all group">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-red-500 font-black text-sm">{z.zone}</span>
                                <h4 className="font-bold text-[10px] uppercase tracking-widest text-gray-300">{z.name}</h4>
                            </div>
                            <p className="text-2xl font-black text-white mb-2">{z.range}</p>
                            <p className="text-[10px] text-gray-500 italic leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">{z.description}</p>
                        </div>
                    ))}
                </div>
             </div>
        )}

        <div className="space-y-6">
            <div className="flex items-center gap-4 px-2">
                <div className="w-3 h-3 bg-red-600 rotate-45"></div>
                <h3 className="text-xl font-black uppercase italic tracking-tight text-gray-900">Periodización y Microciclos</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {weeks.map((week) => (
                    <AccordionItem key={week.semana} week={week} />
                ))}
            </div>
        </div>

        {/* Epic Final Quote */}
        {lastWeek?.mensaje_motivacional && (
            <div className="mt-20 relative px-10 py-16 text-center bg-gray-50 rounded-[3rem] border border-gray-100">
                <span className="absolute top-8 left-1/2 -translate-x-1/2 text-8xl text-red-600/5 font-serif">"</span>
                <p className="relative z-10 text-2xl md:text-3xl font-black text-gray-800 italic leading-tight max-w-3xl mx-auto">
                    {lastWeek.mensaje_motivacional}
                </p>
                <div className="mt-10 flex flex-col items-center">
                    <div className="h-1 w-12 bg-red-600 rounded-full mb-4"></div>
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">Head Coach • Osorno Runner IA</p>
                </div>
            </div>
        )}
      </div>
    </section>
  );
});

export default PlanDisplay;
