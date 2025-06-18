import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle, Mail } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { validateEmail } from "@/lib/brazilian-validators";

export default function EmailValidator() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<{ isValid: boolean; message: string } | null>(null);

  const handleValidate = () => {
    if (!email.trim()) {
      setResult({ isValid: false, message: "Digite um email" });
      return;
    }
    
    const isValid = validateEmail(email);
    setResult({
      isValid,
      message: isValid ? "Email válido" : "Email inválido"
    });
  };

  return (
    <ToolCard
      title="Validador de Email"
      icon={<Mail className="text-success w-6 h-6" />}
    >
      <div className="space-y-4">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite o email"
        />
        
        <Button onClick={handleValidate} className="w-full bg-success hover:bg-success/90">
          <Mail className="mr-2 w-4 h-4" />
          Validar Email
        </Button>
        
        {result && (
          <div className={`
            p-3 rounded-lg text-center
            ${result.isValid 
              ? 'bg-green-50 text-green-700' 
              : 'bg-red-50 text-red-700'
            }
          `}>
            {result.isValid ? (
              <CheckCircle className="w-6 h-6 mx-auto mb-2" />
            ) : (
              <XCircle className="w-6 h-6 mx-auto mb-2" />
            )}
            <div className="font-medium">{result.message}</div>
          </div>
        )}
      </div>
    </ToolCard>
  );
}
