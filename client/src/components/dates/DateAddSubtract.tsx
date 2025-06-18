import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarPlus, Calculator } from "lucide-react";
import ToolCard from "@/components/ToolCard";

export default function DateAddSubtract() {
  const [baseDate, setBaseDate] = useState("");
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  const [amount, setAmount] = useState<number>(30);
  const [unit, setUnit] = useState<'days' | 'weeks' | 'months' | 'years' | 'business-days'>('days');
  const [result, setResult] = useState({
    date: '--/--/----',
    weekday: 'Dia da semana'
  });

  useEffect(() => {
    // Set default date to today
    const today = new Date();
    setBaseDate(today.toISOString().split('T')[0]);
  }, []);

  const handleCalculate = () => {
    if (!baseDate || isNaN(amount)) {
      alert('Selecione uma data base e digite uma quantidade válida');
      return;
    }

    const resultDate = new Date(baseDate);
    const multiplier = operation === 'add' ? 1 : -1;

    switch(unit) {
      case 'days':
        resultDate.setDate(resultDate.getDate() + (amount * multiplier));
        break;
      case 'business-days':
        let remainingDays = amount;
        while (remainingDays > 0) {
          resultDate.setDate(resultDate.getDate() + multiplier);
          // Se não for sábado (6) nem domingo (0)
          if (resultDate.getDay() !== 0 && resultDate.getDay() !== 6) {
            remainingDays--;
          }
        }
        break;
      case 'weeks':
        resultDate.setDate(resultDate.getDate() + (amount * 7 * multiplier));
        break;
      case 'months':
        resultDate.setMonth(resultDate.getMonth() + (amount * multiplier));
        break;
      case 'years':
        resultDate.setFullYear(resultDate.getFullYear() + (amount * multiplier));
        break;
    }

    const weekdays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const weekday = weekdays[resultDate.getDay()];

    setResult({
      date: resultDate.toLocaleDateString('pt-BR'),
      weekday
    });
  };

  return (
    <ToolCard
      title="Somar/Subtrair Dias"
      icon={<CalendarPlus className="text-primary w-6 h-6" />}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Data base</label>
          <Input
            type="date"
            value={baseDate}
            onChange={(e) => setBaseDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Operação</label>
          <Select value={operation} onValueChange={(value: 'add' | 'subtract') => setOperation(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="add">Somar</SelectItem>
              <SelectItem value="subtract">Subtrair</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Quantidade</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
              placeholder="30"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Unidade</label>
            <Select value={unit} onValueChange={(value: 'days' | 'weeks' | 'months' | 'years' | 'business-days') => setUnit(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="days">Dias</SelectItem>
                <SelectItem value="business-days">Dias Úteis</SelectItem>
                <SelectItem value="weeks">Semanas</SelectItem>
                <SelectItem value="months">Meses</SelectItem>
                <SelectItem value="years">Anos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={handleCalculate} className="w-full">
          <Calculator className="mr-2 w-4 h-4" />
          Calcular Nova Data
        </Button>

        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-gray-600 text-sm">Nova data:</div>
          <div className="font-semibold text-xl">{result.date}</div>
          <div className="text-gray-500 text-sm mt-1">{result.weekday}</div>
        </div>
      </div>
    </ToolCard>
  );
}