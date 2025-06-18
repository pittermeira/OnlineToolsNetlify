import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Key, Copy, Wand2 } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { generatePassword } from "@/lib/generators";
import { useClipboard } from "@/hooks/useClipboard";

export default function PasswordGenerator() {
  const [result, setResult] = useState("");
  const [length, setLength] = useState([12]);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const { copyToClipboard } = useClipboard();

  const handleGenerate = () => {
    const password = generatePassword({
      length: length[0],
      uppercase,
      lowercase,
      numbers,
      symbols
    });
    setResult(password);
  };

  return (
    <ToolCard
      title="Gerador de Senha"
      icon={<Key className="text-primary w-6 h-6" />}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Comprimento: {length[0]} caracteres
          </label>
          <Slider
            value={length}
            onValueChange={setLength}
            max={50}
            min={4}
            step={1}
            className="w-full"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="uppercase" 
              checked={uppercase}
              onCheckedChange={setUppercase}
            />
            <label htmlFor="uppercase" className="text-sm">A-Z</label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="lowercase" 
              checked={lowercase}
              onCheckedChange={setLowercase}
            />
            <label htmlFor="lowercase" className="text-sm">a-z</label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="numbers" 
              checked={numbers}
              onCheckedChange={setNumbers}
            />
            <label htmlFor="numbers" className="text-sm">0-9</label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="symbols" 
              checked={symbols}
              onCheckedChange={setSymbols}
            />
            <label htmlFor="symbols" className="text-sm">!@#$</label>
          </div>
        </div>
        
        <Button onClick={handleGenerate} className="w-full">
          <Wand2 className="mr-2 w-4 h-4" />
          Gerar Senha
        </Button>
        
        <div className="space-y-2">
          <Input
            value={result}
            readOnly
            placeholder="Senha será gerada aqui"
            className="bg-gray-50 font-mono"
          />
          {result && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => copyToClipboard(result)}
            >
              <Copy className="mr-1 w-4 h-4" />
              Copiar
            </Button>
          )}
        </div>
      </div>
    </ToolCard>
  );
}
