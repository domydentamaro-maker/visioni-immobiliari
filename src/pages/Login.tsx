import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, signIn, signUp, isAdmin, resetPassword } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (isAdmin) {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    }
  }, [user, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (showResetPassword) {
        const { error } = await resetPassword(email);
        if (error) {
          toast.error(error.message || 'Errore durante il reset della password');
        } else {
          toast.success('Email di reset inviata! Controlla la tua casella di posta.');
          setShowResetPassword(false);
        }
      } else if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast.error(error.message || 'Errore durante il login');
        } else {
          toast.success('Login effettuato con successo!');
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          toast.error(error.message || 'Errore durante la registrazione');
        } else {
          toast.success('Registrazione completata! Effettua il login.');
          setIsLogin(true);
        }
      }
    } catch (error) {
      toast.error('Si è verificato un errore');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4 bg-gradient-subtle">
        <Card className="w-full max-w-md shadow-elegant">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-3xl font-display">
              {showResetPassword ? 'Reset Password' : isLogin ? 'Accedi' : 'Registrati'}
            </CardTitle>
            <CardDescription>
              {showResetPassword
                ? 'Inserisci la tua email per ricevere il link di reset'
                : isLogin
                ? 'Inserisci le tue credenziali per accedere'
                : 'Crea un nuovo account'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nome@esempio.it"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {!showResetPassword && (
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Caricamento...' : showResetPassword ? 'Invia Email' : isLogin ? 'Accedi' : 'Registrati'}
              </Button>
            </form>
            {isLogin && !showResetPassword && (
              <div className="mt-3 text-center text-sm">
                <button
                  type="button"
                  onClick={() => setShowResetPassword(true)}
                  className="text-primary hover:underline"
                >
                  Password dimenticata?
                </button>
              </div>
            )}
            <div className="mt-4 text-center text-sm">
              <button
                type="button"
                onClick={() => {
                  setShowResetPassword(false);
                  setIsLogin(!isLogin);
                }}
                className="text-primary hover:underline"
              >
                {showResetPassword
                  ? 'Torna al login'
                  : isLogin
                  ? 'Non hai un account? Registrati'
                  : 'Hai già un account? Accedi'}
              </button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
