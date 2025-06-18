import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Crown, ArrowRightLeft } from "lucide-react";
import ToolCard from "@/components/ToolCard";

export default function RomanConverter() {
  const [number, setNumber] = useState<number>(0);
  const [roman, setRoman] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState<"to-roman" | "to-number">("to-roman");

  const numberToRoman = (num: number): string => {
    if (num <= 0 || num > 3999) return "Número fora do intervalo (1-3999)";
    
    const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const symbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
    
    let result = "";
    
    for (let i = 0; i < values.length; i++) {
      while (num >= values[i]) {
        result += symbols[i];
        num -= values[i];
      }
    }
    
    return result;
  };

  const romanToNumber = (roman: string): number => {
    const romanNumerals: {[key: string]: number} = {
      I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000
    };
    
    let result = 0;
    let prevValue = 0;
    
    for (let i = roman.length - 1; i >= 0; i--) {
      const currentValue = romanNumerals[roman[i]];
      
      if (!currentValue) return -1; // Invalid character
      
      if (currentValue < prevValue) {
        result -= currentValue;
      } else {
        result += currentValue;
      }
      
      prevValue = currentValue;
    }
    
    return result;
  };

  const convertToRoman = () => {
    if (number <= 0 || number > 3999) {
      setResult("Número deve estar entre 1 e 3999");
      return;
    }
    
    setResult(numberToRoman(number));
  };

  const convertToNumber = () => {
    if (!roman.trim()) {
      setResult("Digite um numeral romano");
      return;
    }
    
    const num = romanToNumber(roman.toUpperCase());
    if (num === -1) {
      setResult("Numeral romano inválido");
      return;
    }
    
    setResult(num.toString());
  };

  return (
    <ToolCard
      title="Conversor Romano"
      icon={<Crown className="text-primary w-6 h-6" />}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={mode === "to-roman" ? "default" : "ghost"}
            onClick={() => setMode("to-roman")}
            className="text-sm"
          >
            → Romano
          </Button>
          <Button
            variant={mode === "to-number" ? "default" : "ghost"}
            onClick={() => setMode("to-number")}
            className="text-sm"
          >
            → Número
          </Button>
        </div>

        {mode === "to-roman" ? (
          <div className="space-y-2">
            <Input
              type="number"
              value={number}
              onChange={(e) => setNumber(Number(e.target.value))}
              placeholder="Digite um número (1-3999)"
              min="1"
              max="3999"
            />
            <Button onClick={convertToRoman} className="w-full">
              <ArrowRightLeft className="mr-2 w-4 h-4" />
              Converter para Romano
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <Input
              type="text"
              value={roman}
              onChange={(e) => setRoman(e.target.value)}
              placeholder="Digite numeral romano (ex: XIV)"
              style={{ textTransform: 'uppercase' }}
            />
            <Button onClick={convertToNumber} className="w-full">
              <ArrowRightLeft className="mr-2 w-4 h-4" />
              Converter para Número
            </Button>
          </div>
        )}

        {result && (
          <div className="p-3 border border-gray-300 rounded-lg bg-gray-50 text-center">
            <div className="font-semibold text-lg">{result}</div>
          </div>
        )}
      </div>
    </ToolCard>
  );
}
