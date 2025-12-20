
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  const isConfigError = message.toLowerCase().includes('api key') || message.toLowerCase().includes('configuración');

  return (
    <div className={`border-2 rounded-3xl p-6 shadow-xl animate-fadeIn ${
      isConfigError 
      ? 'bg-amber-50 border-amber-200 text-amber-900' 
      : 'bg-red-50 border-red-200 text-red-900'
    }`} role="alert">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-2xl ${isConfigError ? 'bg-amber-600' : 'bg-red-600'} text-white shadow-lg`}>
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex-grow">
            <h3 className="font-black uppercase tracking-tight text-lg mb-1">
                {isConfigError ? 'Aviso del Sistema' : 'Error en la Generación'}
            </h3>
            <p className="text-sm font-medium leading-relaxed opacity-90">{message}</p>
            {isConfigError && (
                <p className="mt-3 text-xs font-bold bg-amber-100 p-2 rounded-lg inline-block border border-amber-200">
                    Sugerencia: Revisa tu archivo .env.local y reinicia el servidor de desarrollo.
                </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
