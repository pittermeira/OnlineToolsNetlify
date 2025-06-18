import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Divide, Calculator } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { calculateGCD, calculateLCM } from "@/lib/math-utils";

export default function GCDLCMCalculator() {
  const [num1, setNum1] = useState<number>(12);
  const [num2, setNum2] = useState<number>(18);
  const [gcd, setGcd] = useState(0);
  const [lcm, setLcm] = useState(0);

  const handleCalculate = () => {
    if (isNaN(num1) || isNaN(num2) || num1 <= 0 || num2 <= 0) {
      alert('Digite números inteiros positivos');
      return;
    }
    
    const gcdResult = calculateGCD(num1, num2);
    const lcmResult = calculateLCM(num1, num2);
    
    setGcd(gcdResult);
    setLcm(lcmResult);
  };

  return (
    <ToolCard
      title="MDC e MMC"
      icon={<Divide className="text-primary w-6 h-6" />}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Primeiro número</label>
          <Input
            type="number"
            value={num1}
            onChange={(e) => setNum1(parseInt(e.target.value) || 0)}
            placeholder="12"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-1">Segundo número</label>
          <Input
            type="number"
            value={num2}
            onChange={(e) => setNum2(parseInt(e.target.value) || 0)}
            placeholder="18"
          />
        </div>
        
        <Button onClick={handleCalculate} className="w-full">
          <Calculator className="mr-2 w-4 h-4" />
          Calcular
        </Button>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <div className="font-semibold text-lg">{gcd}</div>
            <div className="text-gray-600 text-sm">MDC</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <div className="font-semibold text-lg">{lcm}</div>
            <div className="text-gray-600 text-sm">MMC</div>
          </div>
        </div>
      </div>
    </ToolCard>
  );
}
