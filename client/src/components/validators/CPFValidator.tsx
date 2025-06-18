import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle, Shield } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { validateCPF } from "@/lib/brazilian-validators";

export default function CPFValidator() {
  const [cpf, setCpf] = useState("");
  const [result, setResult] = useState<{ isValid: boolean; message: string } | null>(null);

  const handleValidate = () => {
    if (!cpf.trim()) {
      setResult({ isValid: false, message: "Digite um CPF" });
      return;
    }
    
    const isValid = validateCPF(cpf);
    setResult({
      isValid,
      message: isValid ? "CPF válido" : "CPF inválido"
    });
  };

  return (
    <ToolCard
      title="Validador de CPF"
      icon={<Shield className="text-success w-6 h-6" />}
    >
      <div className="space-y-4">
        <Input
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          placeholder="Digite o CPF (000.000.000-00)"
        />
        
        <Button onClick={handleValidate} className="w-full bg-success hover:bg-success/90">
          <Shield className="mr-2 w-4 h-4" />
          Validar CPF
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
