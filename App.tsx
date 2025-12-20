
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { AthleteData, GeneratedPlanResponse, SystemStatus } from './types';
import { generatePlan } from './services/geminiService';
import TrainingForm from './components/TrainingForm';
import PlanDisplay from './components/PlanDisplay';
import Spinner from './components/Spinner';
import ErrorMessage from './components/ErrorMessage';
import Header from './components/Header';
import PdfDocument from './components/PdfDocument';

declare const jspdf: any;
declare const html2canvas: any;

const App: React.FC = () => {
  const [athleteData, setAthleteData] = useState<AthleteData | null>(null);
  const [generatedResult, setGeneratedResult] = useState<GeneratedPlanResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [systemStatus, setSystemStatus] = useState<SystemStatus>('offline');
  
  const pdfRef = useRef<HTMLDivElement>(null);
  const planRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const apiKey = process.env.API_KEY;
    if (apiKey && apiKey !== 'undefined') {
      setSystemStatus('online');
    } else {
      setSystemStatus('offline');
    }
  }, []);

  const handleFormSubmit = async (data: AthleteData) => {
    setIsLoading(true);
    setError(null);
    setGeneratedResult(null);
    setAthleteData(data);

    try {
      const result = await generatePlan(data);
      setGeneratedResult(result);
      // Pequeño delay para asegurar que el DOM se renderizó antes del scroll
      setTimeout(() => {
        planRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    } catch (err: any) {
      console.error("Coach IA Error:", err);
      if (err.message === 'API_KEY_INVALID') {
        setError('Acceso denegado: La clave API configurada no es válida.');
      } else if (err.message === 'API_KEY_MISSING') {
        setError('Configuración incompleta: No se detectó una API_KEY en el entorno.');
      } else if (err.message === 'API_QUOTA_EXCEEDED') {
        setError('Servidor saturado: Se ha excedido el límite de consultas permitidas hoy.');
      } else {
        setError(err.message || 'Error desconocido al generar el plan.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportPDF = useCallback(() => {
    if (pdfRef.current && athleteData) {
        // Bloqueamos la UI un segundo para la generación
        html2canvas(pdfRef.current, { 
            scale: 2,
            backgroundColor: '#ffffff',
            useCORS: true,
            logging: false
        }).then((canvas: HTMLCanvasElement) => {
            const imgData = canvas.toDataURL('image/png');
            const { jsPDF } = jspdf;
            const pdf = new jsPDF('p', 'pt', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const imgProps = pdf.getImageProperties(imgData);
            const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
            
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdf.internal.pageSize.getHeight();

            while (heightLeft >= 0) {
              position = heightLeft - imgHeight;
              pdf.addPage();
              pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
              heightLeft -= pdf.internal.pageSize.getHeight();
            }

            pdf.save(`OsornoRunner_${athleteData.name.replace(/\s+/g, '_')}_Plan.pdf`);
        });
    }
  }, [athleteData]);

  return (
    <div className="bg-[#fafafa] text-gray-900 min-h-screen font-sans selection:bg-red-100 selection:text-red-900">
      <Header status={systemStatus} />
      
      <main className="container mx-auto px-4 py-8 md:py-16 max-w-7xl">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12">
          
          {/* Formulario Section */}
          <div className="lg:col-span-5 order-2 lg:order-1"> 
            <TrainingForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>

          {/* Resultado/Visualizador Section */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="sticky top-28 space-y-6">
              {isLoading && <Spinner />}
              {error && <ErrorMessage message={error} />}
              
              {generatedResult ? (
                <div ref={planRef}>
                    <PlanDisplay 
                      result={generatedResult} 
                      onExportPDF={handleExportPDF}
                    />
                </div>
              ) : !isLoading && !error && (
                  <div className="flex flex-col items-center justify-center min-h-[500px] bg-white border border-gray-100 rounded-[2.5rem] p-12 text-center shadow-sm">
                      <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mb-8 transform -rotate-6">
                        <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                      </div>
                      <h3 className="text-3xl font-black text-gray-900 uppercase italic tracking-tighter mb-4">Ingeniería <span className="text-red-600">Running</span></h3>
                      <p className="text-gray-400 text-sm max-w-xs leading-relaxed font-medium">Completa tu perfil biométrico a la izquierda para que el motor de IA de Osorno Runner genere tu estrategia de carrera personalizada.</p>
                      
                      <div className="mt-12 grid grid-cols-2 gap-8 border-t border-gray-50 pt-12 w-full">
                         <div className="text-center">
                            <p className="text-xl font-black text-gray-800 tracking-tighter uppercase">Friel v3</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Metodología</p>
                         </div>
                         <div className="text-center">
                            <p className="text-xl font-black text-gray-800 tracking-tighter uppercase">Gemini 3</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Motor IA</p>
                         </div>
                      </div>
                  </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Hidden PDF Component */}
      {athleteData && generatedResult && (
          <PdfDocument 
             ref={pdfRef} 
             athlete={athleteData} 
             result={generatedResult} 
          />
      )}
    </div>
  );
};

export default App;
