
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Search } from "lucide-react";
import ToolCard from "@/components/ToolCard";

export default function DayOfWeek() {
  const [date, setDate] = useState("");
  const [result, setResult] = useState("");

  const findDayOfWeek = () => {
    if (!date) return;
    
    const dateObj = new Date(date);
    const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    
    setResult(days[dateObj.getDay()]);
  };

  return (
    <ToolCard
      title="Dia da Semana"
      icon={<Calendar className="text-primary w-6 h-6" />}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Data</label>
          <Input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)} 
          />
        </div>
        
        <Button onClick={findDayOfWeek} className="w-full">
          <Search className="mr-2 w-4 h-4" />
          Descobrir Dia da Semana
        </Button>
        
        {result && (
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="font-semibold text-xl">{result}</div>
          </div>
        )}
      </div>
    </ToolCard>
  );
}
