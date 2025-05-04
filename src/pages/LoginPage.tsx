import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Logo } from "../components/Logo";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { toast } from "../components/ui/use-toast";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://mentor-piano-white-recordings.trycloudflare.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      console.log("Login Request:", { email, password });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data.user || { email }));

      toast({
        title: "Login successful",
        description: "Welcome to Importa Luxo",
      });

      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials",
        variant: "destructive",
      });
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-white">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        <div className="brutalist-card mb-6">
          <h1 className="brutalist-header mb-6 text-center">LOGIN</h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block uppercase font-bold mb-1">
                Email
              </label>
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
              <label
                htmlFor="password"
                className="block uppercase font-bold mb-1"
              >
                Password
              </label>
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

            <Button
              type="submit"
              className="brutalist-button w-full mt-6"
              disabled={loading}
            >
              {loading ? "LOADING..." : "LOGIN"}
            </Button>
          </form>
        </div>

        <div className="text-center">
          <p className="font-mono">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold underline hover:no-underline"
            >
              REGISTER
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
