
import React from 'react';
import { SystemStatus } from '../types';

interface HeaderProps {
  status: SystemStatus;
}

const Header: React.FC<HeaderProps> = ({ status }) => {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <svg className="h-12 w-12 md:h-14 md:w-14 drop-shadow-md" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 6L4 58H60L32 6Z" fill="#000000" stroke="#000000" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M32 6L22 24L28 20L32 26L36 20L42 24L32 6Z" fill="white" stroke="none"/>
                <rect x="18" y="42" width="28" height="6" rx="3" transform="rotate(-30 32 45)" fill="#dc2626" stroke="white" strokeWidth="1"/>
                <path d="M10 45L6 48" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
                <path d="M14 52L8 56" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            
            <div className="flex flex-col justify-center">
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter uppercase leading-none italic">
                    Osorno<span className="text-red-600">Runner</span>
                </h1>
                <div className="flex items-center gap-2 mt-1">
                    <span className="h-0.5 w-8 bg-red-600"></span>
                    <span className="text-[10px] md:text-xs font-bold text-gray-500 tracking-[0.3em] uppercase">
                        AI Training Engine
                    </span>
                </div>
            </div>
        </div>

        <div className="flex items-center gap-3">
            <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${
                status === 'online' ? 'bg-green-50 border-green-200 text-green-600' : 'bg-red-50 border-red-200 text-red-600'
            }`}>
                <span className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                {status === 'online' ? 'Coach IA Online' : 'IA Offline'}
            </div>
            <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-red-200">
                PRO v3.1
            </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
