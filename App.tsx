import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { OrderDetail } from './pages/OrderDetail';
import { Profile } from './pages/Profile';
import { useAppStore } from './store';

// Simulate receiving an order after being online for a few seconds
const OrderSimulator = () => {
  const { status, setOrder } = useAppStore();

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (status === 'ONLINE') {
      // Randomly trigger an order between 5 and 15 seconds for demo purposes
      const delay = Math.random() * 10000 + 5000;
      
      timeout = setTimeout(() => {
        setOrder({
          id: `ORD-${Date.now()}`,
          price: 14.50,
          distanceKm: 3.2,
          pickupAddress: "12 Rue de Rivoli, 75001 Paris",
          deliveryAddress: "45 Avenue de la République, 75011 Paris",
          status: 'PENDING'
        });
        
        // Play notification sound (simulated logic)
        console.log("New Order Received!");
      }, delay);
    }

    return () => clearTimeout(timeout);
  }, [status, setOrder]);

  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <OrderSimulator />
      <div className="w-screen h-screen bg-slate-100 overflow-hidden font-sans text-slate-900 select-none">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/order" element={<OrderDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;