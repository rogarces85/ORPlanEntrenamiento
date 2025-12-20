
import React, { forwardRef } from 'react';
import { AthleteData, GeneratedPlanResponse } from '../types';

interface PdfDocumentProps {
  athlete: AthleteData;
  result: GeneratedPlanResponse;
}

const PdfDocument = forwardRef<HTMLDivElement, PdfDocumentProps>(({ athlete, result }, ref) => {
  const currentDate = new Date().toLocaleDateString('es-ES', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const { weeks, physiologicalData } = result;
  const lastWeek = weeks[weeks.length - 1];

  return (
    <div ref={ref} className="bg-white p-12 w-[800px] mx-auto text-gray-900 font-sans" style={{ position: 'absolute', top: '-10000px', left: '-10000px' }}>
      
      {/* HEADER PROFESIONAL */}
      <div className="flex items-center justify-between border-b-8 border-red-600 pb-8 mb-10">
        <div className="flex items-center gap-6">
             <svg className="h-24 w-24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 6L4 58H60L32 6Z" fill="#000000" stroke="#000000" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M32 6L22 24L28 20L32 26L36 20L42 24L32 6Z" fill="white"/>
                <rect x="18" y="42" width="28" height="6" rx="3" transform="rotate(-30 32 45)" fill="#dc2626" stroke="white" strokeWidth="1"/>
            </svg>
            <div>
                <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none">
                    Osorno<span className="text-red-600">Runner</span>
                </h1>
                <p className="text-xs text-gray-400 font-bold tracking-[0.3em] uppercase mt-2">Personal Training Engine</p>
            </div>
        </div>
        <div className="text-right">
            <p className="text-sm font-black text-red-600 uppercase tracking-widest">Plan de Entrenamiento</p>
            <p className="text-xs text-gray-500 font-bold mt-1 uppercase">{currentDate}</p>
        </div>
      </div>

      {/* PERFIL */}
      <div className="bg-gray-100 p-8 rounded-3xl mb-12 flex justify-between items-center">
          <div>
              <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Corredor Preparado</p>
              <h2 className="text-4xl font-black text-gray-900 uppercase italic">{athlete.name}</h2>
              <p className="text-sm text-gray-500 font-bold mt-1">Semanas de Preparación: {athlete.prepWeeks}</p>
          </div>
          <div className="text-right">
               <div className="bg-black text-white px-6 py-2 rounded-full font-black text-lg mb-2">
                  OBJETIVO: {athlete.distance}
               </div>
               <p className="text-sm font-bold text-red-600 italic">Meta: {athlete.targetTime} • Ritmo: {athlete.currentPace}/km</p>
          </div>
      </div>

      {/* ZONAS */}
      {physiologicalData && (
          <div className="mb-12 break-inside-avoid">
             <h3 className="text-lg font-black bg-black text-white px-6 py-2 inline-block rounded-t-2xl uppercase italic">Zonas Fisiológicas</h3>
             <div className="border-t-4 border-black pt-4 grid grid-cols-1 gap-2">
                 {physiologicalData.zones.map((z, idx) => (
                     <div key={idx} className="flex justify-between border-b border-gray-100 py-3">
                         <span className="font-black text-red-600 w-12">{z.zone}</span>
                         <span className="font-bold text-gray-800 flex-grow">{z.name}</span>
                         <span className="font-mono text-gray-900 w-32 text-right">{z.range}</span>
                     </div>
                 ))}
             </div>
          </div>
      )}

      {/* CALENDARIO */}
      <div className="space-y-10">
        <h3 className="text-lg font-black bg-red-600 text-white px-6 py-2 inline-block rounded-t-2xl uppercase italic">Programación Semanal</h3>
        {weeks.map((week) => (
          <div key={week.semana} className="break-inside-avoid border-l-8 border-red-600 bg-gray-50/50 p-6 rounded-r-3xl">
            <div className="flex justify-between items-center mb-6">
                <h4 className="text-xl font-black uppercase italic">Semana {week.semana}</h4>
                <span className="text-xs font-bold text-red-600 uppercase bg-white px-4 py-1 rounded-full border border-red-100">{week.resumen_semanal}</span>
            </div>
            
            <table className="w-full text-left text-xs">
                <tbody>
                    {week.dias.map((day, idx) => (
                        <tr key={idx} className="border-b border-gray-200 last:border-0">
                            <td className="py-4 px-2 w-24 font-black uppercase text-gray-400">{day.dia}</td>
                            <td className="py-4 px-2 w-32 font-black text-red-600 uppercase italic">{day.tipo_sesion}</td>
                            <td className="py-4 px-2 text-gray-700 leading-relaxed font-medium">{day.descripcion_detallada}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* MOTIVACIÓN FINAL PDF */}
      {lastWeek?.mensaje_motivacional && (
          <div className="mt-20 border-4 border-black p-10 rounded-[3rem] text-center break-inside-avoid">
              <h3 className="text-2xl font-black uppercase italic mb-6">Mensaje del Coach</h3>
              <p className="text-xl font-bold italic leading-relaxed text-gray-700">
                  "{lastWeek.mensaje_motivacional}"
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
                  <div className="h-0.5 w-16 bg-red-600"></div>
                  <span className="text-sm font-black uppercase tracking-widest italic">Nos vemos en la meta</span>
                  <div className="h-0.5 w-16 bg-red-600"></div>
              </div>
          </div>
      )}

      <div className="mt-20 pt-8 border-t border-gray-200 flex justify-between text-[10px] font-bold text-gray-400 uppercase">
          <span>Osorno Runner • Chile</span>
          <span>IA Training Systems v3.0</span>
          <span>osornorunner.cl</span>
      </div>
    </div>
  );
});

export default PdfDocument;
