import React from 'react';
import { useAppStore } from '../store';
import { ArrowLeft, Car, FileText, Lock, Moon, ChevronRight, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Profile: React.FC = () => {
  const { driver } = useAppStore();
  const navigate = useNavigate();

  const menuItems = [
    { icon: Car, label: 'Mes Véhicules', sub: driver?.vehicle.model },
    { icon: FileText, label: 'Documents', sub: 'Validés' },
    { icon: Lock, label: 'Sécurité & Mot de passe', sub: '' },
    { icon: Moon, label: 'Apparence', sub: 'Mode Clair (Défaut)' },
  ];

  return (
    <div className="h-full bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate('/')}
            className="p-2 -ml-2 rounded-full hover:bg-slate-50 text-slate-600"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-slate-900">Mon Compte</h1>
        </div>

        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 overflow-hidden ring-4 ring-slate-50">
             {driver?.avatarUrl ? (
               <img src={driver.avatarUrl} alt="Driver" className="w-full h-full object-cover" />
             ) : (
               <User className="w-10 h-10" />
             )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{driver?.name}</h2>
            <p className="text-sm text-slate-500">{driver?.phone}</p>
            <span className="inline-block mt-2 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded border border-blue-100 uppercase">
              Pro Driver
            </span>
          </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="p-6 space-y-4 flex-1 overflow-y-auto">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {menuItems.map((item, idx) => (
            <button 
              key={idx}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b last:border-0 border-gray-50"
            >
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-slate-100 rounded-lg text-slate-600">
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-slate-900 text-sm">{item.label}</p>
                  {item.sub && <p className="text-xs text-slate-500">{item.sub}</p>}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </button>
          ))}
        </div>

        <button className="w-full flex items-center justify-center gap-2 p-4 text-red-600 font-semibold bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
          <LogOut className="w-5 h-5" /> Déconnexion
        </button>
        
        <p className="text-center text-xs text-slate-400 pt-4">
          Version 1.0.4 (Build 220)
        </p>
      </div>
    </div>
  );
};