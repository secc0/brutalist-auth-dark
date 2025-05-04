
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from '../components/ui/use-toast';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      setLoading(false);
      
      // Store user data (demo only, replace with actual auth)
      localStorage.setItem('user', JSON.stringify({ name, email }));
      
      toast({
        title: "Registration successful",
        description: "Welcome to hypeLeads",
      });
      
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-white">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        
        <div className="brutalist-card mb-6">
          <h1 className="brutalist-header mb-6 text-center">REGISTER</h1>
          
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor="name" className="block uppercase font-bold mb-1">Name</label>
              <Input 
                id="name"
                type="text" 
                placeholder="Your Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="brutalist-input"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block uppercase font-bold mb-1">Email</label>
              <Input 
                id="email"
                type="email" 
                placeholder="your@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="brutalist-input"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block uppercase font-bold mb-1">Password</label>
              <Input 
                id="password"
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="brutalist-input"
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block uppercase font-bold mb-1">Confirm Password</label>
              <Input 
                id="confirmPassword"
                type="password" 
                placeholder="••••••••" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="brutalist-input"
              />
            </div>
            
            <Button 
              type="submit" 
              className="brutalist-button w-full mt-6"
              disabled={loading}
            >
              {loading ? 'CREATING ACCOUNT...' : 'REGISTER'}
            </Button>
          </form>
        </div>
        
        <div className="text-center">
          <p className="font-mono">
            Already have an account?{' '}
            <Link to="/login" className="font-bold underline hover:no-underline">
              LOGIN
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
