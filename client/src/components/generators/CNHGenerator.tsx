
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Car, Copy, Wand2 } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { useClipboard } from "@/hooks/useClipboard";

export default function CNHGenerator() {
  const [result, setResult] = useState("");
  const { copyToClipboard } = useClipboard();

  const generateCNH = () => {
    let cnh = '';
    for (let i = 0; i < 9; i++) {
      cnh += Math.floor(Math.random() * 10);
    }
    
    // Calculate first check digit
    let sum = 0;
    let seq = 2;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cnh[i]) * seq;
      seq++;
      if (seq > 9) seq = 2;
    }
    
    let firstDigit = sum % 11;
    if (firstDigit >= 10) firstDigit = 0;
    
    // Calculate second check digit
    sum = 0;
    seq = 3;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cnh[i]) * seq;
      seq++;
      if (seq > 9) seq = 2;
    }
    sum += firstDigit * 2;
    
    let secondDigit = sum % 11;
    if (secondDigit >= 10) secondDigit = 0;
    
    cnh += firstDigit.toString() + secondDigit.toString();
    setResult(cnh);
  };

  return (
    <ToolCard
      title="Gerador de CNH"
      icon={<Car className="text-primary w-6 h-6" />}
    >
      <div className="space-y-4">
        <Button onClick={generateCNH} className="w-full">
          <Wand2 className="mr-2 w-4 h-4" />
          Gerar CNH
        </Button>
        
        <div className="space-y-2">
          <Input
            value={result}
            readOnly
            placeholder="CNH será gerada aqui"
            className="bg-gray-50"
          />
          {result && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => copyToClipboard(result)}
            >
              <Copy className="mr-1 w-4 h-4" />
              Copiar
            </Button>
          )}
        </div>
      </div>
    </ToolCard>
  );
}
