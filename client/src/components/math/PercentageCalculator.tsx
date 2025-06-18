import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Percent, Calculator } from "lucide-react";
import ToolCard from "@/components/ToolCard";

export default function PercentageCalculator() {
  const [operation, setOperation] = useState("percentage-of");
  const [value1, setValue1] = useState<number>(0);
  const [value2, setValue2] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    let calc = 0;
    
    switch (operation) {
      case "percentage-of":
        // X% of Y
        calc = (value1 / 100) * value2;
        break;
      case "what-percentage":
        // X is what percentage of Y
        calc = (value1 / value2) * 100;
        break;
      case "percentage-change":
        // Percentage change from X to Y
        calc = ((value2 - value1) / value1) * 100;
        break;
      case "add-percentage":
        // Add X% to Y
        calc = value2 + (value1 / 100) * value2;
        break;
      case "subtract-percentage":
        // Subtract X% from Y
        calc = value2 - (value1 / 100) * value2;
        break;
    }
    
    setResult(Math.round(calc * 100) / 100);
  };

  const getOperationLabel = () => {
    switch (operation) {
      case "percentage-of":
        return `${value1}% de ${value2}`;
      case "what-percentage":
        return `${value1} é quantos % de ${value2}`;
      case "percentage-change":
        return `Mudança de ${value1} para ${value2}`;
      case "add-percentage":
        return `${value2} + ${value1}%`;
      case "subtract-percentage":
        return `${value2} - ${value1}%`;
      default:
        return "";
    }
  };

  return (
    <ToolCard
      title="Calculadora de Porcentagem"
      icon={<Percent className="text-primary w-6 h-6" />}
    >
      <div className="space-y-4">
        <Select value={operation} onValueChange={setOperation}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="percentage-of">X% de Y</SelectItem>
            <SelectItem value="what-percentage">X é quantos % de Y</SelectItem>
            <SelectItem value="percentage-change">Mudança percentual</SelectItem>
            <SelectItem value="add-percentage">Adicionar %</SelectItem>
            <SelectItem value="subtract-percentage">Subtrair %</SelectItem>
          </SelectContent>
        </Select>

        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            value={value1}
            onChange={(e) => setValue1(Number(e.target.value))}
            placeholder="Primeiro valor"
          />
          <Input
            type="number"
            value={value2}
            onChange={(e) => setValue2(Number(e.target.value))}
            placeholder="Segundo valor"
          />
        </div>

        <Button onClick={calculate} className="w-full">
          <Calculator className="mr-2 w-4 h-4" />
          Calcular
        </Button>

        {result !== null && (
          <div className="space-y-2">
            <div className="p-3 border border-gray-300 rounded-lg bg-gray-50">
              <div className="text-sm text-gray-600 mb-1">{getOperationLabel()}</div>
              <div className="font-semibold text-lg">{result}</div>
            </div>
          </div>
        )}
      </div>
    </ToolCard>
  );
}
