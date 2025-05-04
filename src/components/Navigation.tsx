
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '../components/ui/use-toast';

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/login');
  };

  return (
    <div className={`topbar ${className}`}>
      <div className="nav-left">
        <Link to="/dashboard">Home</Link>
        <Link to="/quoted-items">Peças cotadas</Link>
        <Link to="/ready-to-ship">Pronta entrega</Link>
      </div>
      <div className="nav-right">
        <Link to="/my-quotes">Minhas cotações</Link>
        <Link to="/my-orders">Meus pedidos</Link>
        <button 
          onClick={handleLogout} 
          className="bg-black text-white px-3 py-1 text-sm border-2 border-white font-bold"
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default Navigation;
