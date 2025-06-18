
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, User, Lock } from "lucide-react";

interface LoginModalProps {
  onClose: () => void;
  onLogin: (userData: any) => void;
}

export default function LoginModal({ onClose, onLogin }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Senhas não coincidem!");
      return;
    }

    // Simulate login/register
    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.username,
      email: `${formData.username}@example.com`
    };
    
    onLogin(userData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{isLogin ? "Entrar" : "Criar Conta"}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Nome de usuário"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="pl-10"
                required
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="password"
                placeholder="Senha"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="pl-10"
                required
              />
            </div>
            
            {!isLogin && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="password"
                  placeholder="Confirmar senha"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="pl-10"
                  required
                />
              </div>
            )}
            
            <Button type="submit" className="w-full">
              {isLogin ? "Entrar" : "Criar Conta"}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-primary hover:underline"
            >
              {isLogin ? "Não tem conta? Criar uma" : "Já tem conta? Entrar"}
            </button>
          </div>
          
          <div className="mt-4 text-xs text-gray-600 text-center">
            <p>* Não é necessário ter conta para usar as ferramentas</p>
            <p>* Com conta, seu histórico será salvo automaticamente</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
