
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { Button } from '../components/ui/button';
import { toast } from '../components/ui/use-toast';

interface User {
  name?: string;
  email: string;
}

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="brutalist-border p-4 flex justify-between items-center">
        <Logo className="h-12" />
        <div className="flex items-center gap-4">
          <span className="font-bold hidden md:block">
            {user.name || user.email}
          </span>
          <Button 
            onClick={handleLogout}
            className="brutalist-button py-2"
          >
            LOGOUT
          </Button>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto p-4 max-w-6xl">
        <div className="brutalist-card mt-8 mb-8">
          <h1 className="brutalist-header mb-6">WELCOME TO HYPELEADS</h1>
          <p className="text-lg mb-6">
            This is your brutalist dashboard. Your leads and campaigns will appear here.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="brutalist-border p-6">
              <h2 className="text-xl font-bold mb-4 uppercase">RECENT LEADS</h2>
              <p className="text-muted-foreground">No leads yet. Start by creating your first campaign.</p>
            </div>
            
            <div className="brutalist-border p-6">
              <h2 className="text-xl font-bold mb-4 uppercase">PERFORMANCE</h2>
              <p className="text-muted-foreground">No data available. Check back after your first campaign.</p>
            </div>
          </div>
        </div>
        
        <div className="brutalist-card">
          <h2 className="text-xl font-bold mb-4 uppercase">QUICK ACTIONS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Button className="brutalist-button">NEW CAMPAIGN</Button>
            <Button className="brutalist-button">IMPORT LEADS</Button>
            <Button className="brutalist-button">ANALYTICS</Button>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="brutalist-border-t mt-12 py-6 text-center">
        <p className="font-mono">© 2025 HYPELEADS. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
};

export default DashboardPage;
