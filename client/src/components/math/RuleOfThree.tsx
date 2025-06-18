import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrendingUp, Calculator } from "lucide-react";
import ToolCard from "@/components/ToolCard";

export default function RuleOfThree() {
  const [a, setA] = useState<number>(0);
  const [b, setB] = useState<number>(0);
  const [c, setC] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    if (a === 0) {
      alert("O primeiro valor não pode ser zero");
      return;
    }
    
    // Rule of three: a/b = c/x, so x = (b * c) / a
    const x = (b * c) / a;
    setResult(Math.round(x * 100) / 100);
  };

  return (
    <ToolCard
      title="Regra de Três"
      icon={<TrendingUp className="text-primary w-6 h-6" />}
    >
      <div className="space-y-4">
        <div className="text-sm text-gray-600 mb-4">
          Se <strong>A</strong> está para <strong>B</strong>, assim como <strong>C</strong> está para <strong>X</strong>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">A</label>
            <Input
              type="number"
              value={a}
              onChange={(e) => setA(Number(e.target.value))}
              placeholder="Valor A"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">B</label>
            <Input
              type="number"
              value={b}
              onChange={(e) => setB(Number(e.target.value))}
              placeholder="Valor B"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">C</label>
            <Input
              type="number"
              value={c}
              onChange={(e) => setC(Number(e.target.value))}
              placeholder="Valor C"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">X (resultado)</label>
            <div className="px-3 py-2 border border-gray-300 rounded bg-gray-50">
              {result !== null ? result : "?"}
            </div>
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-600">
          {a} : {b} = {c} : X
        </div>
        
        <Button onClick={calculate} className="w-full">
          <Calculator className="mr-2 w-4 h-4" />
          Calcular X
        </Button>
        
        {result !== null && (
          <div className="p-3 border border-gray-300 rounded-lg bg-green-50 text-center">
            <div className="font-semibold text-lg text-green-700">X = {result}</div>
          </div>
        )}
      </div>
    </ToolCard>
  );
}
