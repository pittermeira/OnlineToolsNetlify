import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarMinus, Calculator } from "lucide-react";
import ToolCard from "@/components/ToolCard";

export default function DateDifference() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [results, setResults] = useState({
    days: 0,
    weeks: 0,
    months: 0,
    years: 0
  });

  useEffect(() => {
    // Set default dates (today and tomorrow)
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    setStartDate(today.toISOString().split('T')[0]);
    setEndDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  const handleCalculate = () => {
    if (!startDate || !endDate) {
      alert('Selecione ambas as datas');
      return;
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const timeDiff = Math.abs(end.getTime() - start.getTime());
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    const weeksDiff = Math.floor(daysDiff / 7);
    const monthsDiff = Math.floor(daysDiff / 30.44); // Average days per month
    const yearsDiff = Math.floor(daysDiff / 365.25); // Average days per year
    
    setResults({
      days: daysDiff,
      weeks: weeksDiff,
      months: monthsDiff,
      years: yearsDiff
    });
  };

  return (
    <ToolCard
      title="Contador de Dias"
      icon={<CalendarMinus className="text-primary w-6 h-6" />}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Data inicial</label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-1">Data final</label>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        
        <Button onClick={handleCalculate} className="w-full">
          <Calculator className="mr-2 w-4 h-4" />
          Calcular Diferença
        </Button>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <div className="font-semibold text-lg">{results.days}</div>
            <div className="text-gray-600 text-sm">Dias</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <div className="font-semibold text-lg">{results.weeks}</div>
            <div className="text-gray-600 text-sm">Semanas</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <div className="font-semibold text-lg">{results.months}</div>
            <div className="text-gray-600 text-sm">Meses</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <div className="font-semibold text-lg">{results.years}</div>
            <div className="text-gray-600 text-sm">Anos</div>
          </div>
        </div>
      </div>
    </ToolCard>
  );
}
