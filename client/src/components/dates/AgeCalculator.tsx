
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Calculator } from "lucide-react";
import ToolCard from "@/components/ToolCard";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [result, setResult] = useState<{years: number, months: number, days: number} | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;
    
    const birth = new Date(birthDate);
    const target = targetDate ? new Date(targetDate) : new Date();
    
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();
    
    if (days < 0) {
      months--;
      const lastDayOfPrevMonth = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
      days += lastDayOfPrevMonth;
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    setResult({ years, months, days });
  };

  return (
    <ToolCard
      title="Calculadora de Idade"
      icon={<Calendar className="text-primary w-6 h-6" />}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Data de Nascimento</label>
          <Input 
            type="date" 
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)} 
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-1">Data de Referência (opcional)</label>
          <Input 
            type="date" 
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            placeholder="Deixe vazio para usar data atual"
          />
        </div>
        
        <Button onClick={calculateAge} className="w-full">
          <Calculator className="mr-2 w-4 h-4" />
          Calcular Idade
        </Button>
        
        {result && (
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="font-semibold text-lg">{result.years}</div>
              <div className="text-gray-600 text-sm">Anos</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="font-semibold text-lg">{result.months}</div>
              <div className="text-gray-600 text-sm">Meses</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="font-semibold text-lg">{result.days}</div>
              <div className="text-gray-600 text-sm">Dias</div>
            </div>
          </div>
        )}
      </div>
    </ToolCard>
  );
}
