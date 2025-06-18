
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Calculator } from "lucide-react";
import ToolCard from "@/components/ToolCard";

export default function BusinessDaysCalculator() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculateBusinessDays = () => {
    if (!startDate || !endDate) return;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    let count = 0;
    
    const current = new Date(start);
    while (current <= end) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Não é domingo (0) nem sábado (6)
        count++;
      }
      current.setDate(current.getDate() + 1);
    }
    
    setResult(count);
  };

  return (
    <ToolCard
      title="Calculadora de Dias Úteis"
      icon={<Calendar className="text-primary w-6 h-6" />}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Data Inicial</label>
          <Input 
            type="date" 
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)} 
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-1">Data Final</label>
          <Input 
            type="date" 
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)} 
          />
        </div>
        
        <Button onClick={calculateBusinessDays} className="w-full">
          <Calculator className="mr-2 w-4 h-4" />
          Calcular Dias Úteis
        </Button>
        
        {result !== null && (
          <div className="p-3 border border-gray-300 rounded-lg bg-gray-50 text-center">
            <div className="font-semibold text-lg">{result}</div>
            <div className="text-gray-600 text-sm">dias úteis</div>
          </div>
        )}
      </div>
    </ToolCard>
  );
}
