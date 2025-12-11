import React from 'react';
import { useAppStore } from '../store';
import { Button } from '../components/ui/Button';
import { Navigation, Phone, MessageSquare, Package, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const OrderDetail: React.FC = () => {
  const { currentOrder, setOrder, updateStats, dailyStats } = useAppStore();
  const navigate = useNavigate();

  // Redirect if no order exists
  React.useEffect(() => {
    if (!currentOrder) {
      navigate('/');
    }
  }, [currentOrder, navigate]);

  if (!currentOrder) return null;

  const handleComplete = () => {
    // Mock completion logic
    updateStats({
      completedOrders: dailyStats.completedOrders + 1,
      totalEarnings: dailyStats.totalEarnings + currentOrder.price
    });
    setOrder(null); // Clear order, redirects to Dashboard via useEffect in Dashboard
    navigate('/');
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Map Placeholder (Top Half) */}
      <div className="h-[45%] bg-slate-200 relative w-full">
         <div
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-80"
          style={{ 
            backgroundImage: `url('https://maps.locationiq.com/v3/staticmap?key=pk.cc49323fc6339e614aec809f78bc7db4&center=48.8566,2.3522&zoom=16&size=800x600&format=png&maptype=streets')` 
          }}
        />
        {/* Navigation Floating Button */}
        <button className="absolute bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform">
          <Navigation className="w-6 h-6" />
        </button>
      </div>

      {/* Order Details Panel (Bottom Half) */}
      <div className="flex-1 bg-white rounded-t-3xl shadow-negative-xl -mt-6 relative z-10 flex flex-col px-6 py-6 overflow-y-auto">
        
        {/* Header: Price & Distance */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{currentOrder.price.toFixed(2)}€</h2>
            <p className="text-sm text-slate-500 font-medium">Revenu estimé</p>
          </div>
          <div className="text-right">
            <h3 className="text-lg font-bold text-slate-900">{currentOrder.distanceKm} km</h3>
            <p className="text-sm text-slate-500 font-medium">Distance totale</p>
          </div>
        </div>

        <div className="w-full h-[1px] bg-slate-100 mb-6" />

        {/* Timeline / Steps */}
        <div className="space-y-6 flex-1">
          {/* Pickup */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-slate-300 ring-4 ring-slate-100" />
              <div className="w-[2px] h-full bg-slate-200 my-1" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Collecte</p>
              <h4 className="text-base font-semibold text-slate-900 leading-tight mb-1">{currentOrder.pickupAddress}</h4>
              <p className="text-sm text-slate-500">Restaurant Le Gourmet</p>
            </div>
          </div>

          {/* Delivery */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-blue-600 ring-4 ring-blue-100" />
            </div>
            <div>
              <p className="text-xs font-bold text-blue-600 uppercase mb-1">Livraison</p>
              <h4 className="text-base font-semibold text-slate-900 leading-tight mb-1">{currentOrder.deliveryAddress}</h4>
              <p className="text-sm text-slate-500">Client: Jean Dupont</p>
            </div>
          </div>
        </div>

        {/* Customer Actions */}
        <div className="flex gap-3 my-6">
          <Button variant="secondary" className="flex-1 gap-2">
            <Phone className="w-4 h-4" /> Appeler
          </Button>
          <Button variant="secondary" className="flex-1 gap-2">
            <MessageSquare className="w-4 h-4" /> Message
          </Button>
        </div>

        {/* Primary Action Slider */}
        <div className="mt-auto">
          <Button 
            onClick={handleComplete} 
            variant="primary" 
            className="w-full py-4 text-lg shadow-lg shadow-slate-200"
          >
            Confirmer la livraison <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};