import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Divide, Calculator } from "lucide-react";
import ToolCard from "@/components/ToolCard";

export default function FactorizationTool() {
  const [number, setNumber] = useState<number>(0);
  const [factors, setFactors] = useState<number[]>([]);
  const [primeFactors, setPrimeFactors] = useState<{[key: number]: number}>({});

  const findFactors = (num: number): number[] => {
    const factors = [];
    for (let i = 1; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        factors.push(i);
        if (i !== num / i) {
          factors.push(num / i);
        }
      }
    }
    return factors.sort((a, b) => a - b);
  };

  const findPrimeFactors = (num: number): {[key: number]: number} => {
    const primes: {[key: number]: number} = {};
    let n = num;
    
    for (let i = 2; i * i <= n; i++) {
      while (n % i === 0) {
        primes[i] = (primes[i] || 0) + 1;
        n = n / i;
      }
    }
    
    if (n > 1) {
      primes[n] = (primes[n] || 0) + 1;
    }
    
    return primes;
  };

  const handleFactorize = () => {
    if (number <= 0) {
      alert("Digite um número positivo");
      return;
    }
    
    if (number > 1000000) {
      alert("Número muito grande. Use números menores que 1.000.000");
      return;
    }
    
    setFactors(findFactors(number));
    setPrimeFactors(findPrimeFactors(number));
  };

  const formatPrimeFactorization = () => {
    return Object.entries(primeFactors)
      .map(([prime, count]) => count === 1 ? prime : `${prime}^${count}`)
      .join(' × ');
  };

  return (
    <ToolCard
      title="Fatoração"
      icon={<Divide className="text-primary w-6 h-6" />}
    >
      <div className="space-y-4">
        <Input
          type="number"
          value={number}
          onChange={(e) => setNumber(Number(e.target.value))}
          placeholder="Digite um número para fatorar"
          min="1"
        />
        
        <Button onClick={handleFactorize} className="w-full">
          <Calculator className="mr-2 w-4 h-4" />
          Fatorar
        </Button>
        
        {factors.length > 0 && (
          <div className="space-y-3">
            <div className="p-3 border border-gray-300 rounded-lg bg-gray-50">
              <div className="font-medium text-sm text-gray-600 mb-2">Todos os fatores:</div>
              <div className="flex flex-wrap gap-1">
                {factors.map((factor, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                    {factor}
                  </span>
                ))}
              </div>
            </div>
            
            {Object.keys(primeFactors).length > 0 && (
              <div className="p-3 border border-gray-300 rounded-lg bg-gray-50">
                <div className="font-medium text-sm text-gray-600 mb-2">Fatoração prima:</div>
                <div className="font-mono text-lg">{formatPrimeFactorization()}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolCard>
  );
}
