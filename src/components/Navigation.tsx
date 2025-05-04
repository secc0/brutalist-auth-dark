
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '../components/ui/use-toast';

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('user');
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/dashboard');
  };

  return (
    <div className={`topbar ${className}`}>
      <div className="nav-left">
        <Link to="/dashboard">Home</Link>
        {isAuthenticated ? (
          <>
            <Link to="/quoted-items">Peças cotadas</Link>
            <Link to="/ready-to-ship">Pronta entrega</Link>
          </>
        ) : null}
      </div>
      <div className="nav-right">
        {isAuthenticated ? (
          <>
            <Link to="/my-quotes">Minhas cotações</Link>
            <Link to="/my-orders">Meus pedidos</Link>
            <button 
              onClick={handleLogout} 
              className="bg-black text-white px-3 py-1 text-sm border-2 border-white font-bold"
            >
              Sair
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registrar</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navigation;
