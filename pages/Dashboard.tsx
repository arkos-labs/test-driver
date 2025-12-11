import React, { useEffect } from 'react';
import { useAppStore } from '../store';
import { MapPin, Power, Menu, Navigation, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppStatus } from '../types';

export const Dashboard: React.FC = () => {
  const { status, dailyStats, toggleOnline, currentOrder } = useAppStore();
  const navigate = useNavigate();
  const isOnline = status === AppStatus.ONLINE || status === AppStatus.IN_ORDER;

  // Security Navigation Check
  useEffect(() => {
    if (currentOrder) {
      navigate('/order');
    }
  }, [currentOrder, navigate]);

  const handleToggle = () => {
    // Add vibration for feedback
    if (navigator.vibrate) navigator.vibrate(50);
    toggleOnline();
  };

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-white">
      {/* 
        --------------------------------------------------------------
        BACKGROUND MAP (Light Mode / Streets) 
        No dark filters applied per requirements.
        --------------------------------------------------------------
      */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-700"
          style={{ 
            backgroundImage: `url('https://maps.locationiq.com/v3/staticmap?key=pk.cc49323fc6339e614aec809f78bc7db4&center=48.8566,2.3522&zoom=15&size=1080x1920&format=png&maptype=streets')`,
            opacity: 1 
          }}
        />
        {/* Only a very subtle gradient at the very top for status bar legibility if needed, keeping it minimal */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
      </div>

      {/* 
        --------------------------------------------------------------
        UI OVERLAY
        --------------------------------------------------------------
      */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between pt-safe-top pb-safe-bottom">
        
        {/* HEADER: Menu & Profile Quick Access */}
        <div className="flex justify-between items-start px-4 pt-4">
          <button 
            onClick={() => navigate('/profile')}
            className="p-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-100 text-slate-700 active:scale-95 transition-transform"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <button className="p-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-100 text-slate-700 active:scale-95 transition-transform">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
          </button>
        </div>

        {/* 1. TOP HUD: Earnings Bubble */}
        <div className="absolute top-4 left-0 right-0 flex justify-center pointer-events-none">
          <div className="bg-white/95 backdrop-blur-xl border border-gray-200 rounded-full px-6 py-3 shadow-xl flex items-center gap-6 pointer-events-auto">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider">Gains</span>
              <span className="text-lg font-bold text-slate-900 tabular-nums">
                {dailyStats.totalEarnings?.toFixed(2)}<span className="text-sm align-top">€</span>
              </span>
            </div>
            
            <div className="h-8 w-[1px] bg-slate-200" />
            
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider">Courses</span>
              <span className="text-lg font-bold text-emerald-600 tabular-nums">{dailyStats.completedOrders}</span>
            </div>
          </div>
        </div>

        {/* 2. CENTER: Status Indicator */}
        <div className="flex-1 flex flex-col items-center justify-center shrink-0 min-h-0 pointer-events-none">
          {isOnline && (
            <div className="flex flex-col items-center animate-pulse">
              {/* Radar Effect */}
              <div className="relative flex items-center justify-center">
                <div className="absolute w-32 h-32 bg-blue-500/20 rounded-full animate-ping" />
                <div className="w-20 h-20 rounded-full bg-white/80 flex items-center justify-center border border-blue-100 shadow-lg backdrop-blur-sm z-10">
                  <MapPin className="w-10 h-10 text-blue-600 fill-blue-600/20" />
                </div>
              </div>
              
              <h2 className="mt-6 text-lg font-bold text-slate-800 tracking-[0.2em] text-center drop-shadow-sm bg-white/70 px-6 py-2 rounded-full border border-white/50 backdrop-blur-sm">
                RECHERCHE...
              </h2>
            </div>
          )}
          
          {!isOnline && (
            <div className="bg-white/90 px-6 py-3 rounded-2xl shadow-sm border border-gray-100 backdrop-blur-md">
              <p className="text-slate-500 font-medium text-sm">Vous êtes hors ligne</p>
            </div>
          )}
        </div>

        {/* 3. BOTTOM: GO Action Button */}
        <div className="flex flex-col items-center justify-end pb-8 shrink-0 px-6 bg-gradient-to-t from-white/90 via-white/50 to-transparent pt-12">
          
          <button
            onClick={handleToggle}
            className={`
              relative group flex items-center justify-center w-24 h-24 rounded-full shadow-2xl transition-all duration-300 transform active:scale-95 border-4
              ${isOnline 
                ? 'bg-red-500 border-red-100 hover:bg-red-600 shadow-red-500/30' 
                : 'bg-emerald-500 border-emerald-100 hover:bg-emerald-600 shadow-emerald-500/30'
              }
            `}
          >
            <div className="flex flex-col items-center justify-center">
              {isOnline ? (
                <>
                   <span className="text-white font-black text-xl tracking-widest drop-shadow-md">STOP</span>
                </>
              ) : (
                <>
                  <Power className="w-8 h-8 text-white mb-1 drop-shadow-md" />
                  <span className="text-white font-black text-sm tracking-widest drop-shadow-md">GO</span>
                </>
              )}
            </div>
          </button>

          <p className={`
            mt-6 text-[11px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border backdrop-blur-md transition-colors duration-300
            ${isOnline 
              ? 'text-emerald-700 bg-emerald-50/90 border-emerald-100' 
              : 'text-slate-500 bg-white/90 border-slate-200'
            }
          `}>
            {isOnline ? "En ligne • Disponible" : "Hors ligne"}
          </p>
        </div>
      </div>
    </div>
  );
};