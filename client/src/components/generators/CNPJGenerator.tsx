import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Building, Copy, Wand2 } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { generateCNPJ } from "@/lib/generators";
import { useClipboard } from "@/hooks/useClipboard";

export default function CNPJGenerator() {
  const [result, setResult] = useState("");
  const [formatted, setFormatted] = useState(true);
  const { copyToClipboard } = useClipboard();

  const handleGenerate = () => {
    const cnpj = generateCNPJ(formatted);
    setResult(cnpj);
  };

  return (
    <ToolCard
      title="Gerador de CNPJ"
      icon={<Building className="text-primary w-6 h-6" />}
    >
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="cnpj-formatted" 
            checked={formatted}
            onCheckedChange={setFormatted}
          />
          <label htmlFor="cnpj-formatted" className="text-sm text-gray-600">
            Com formatação
          </label>
        </div>
        
        <Button onClick={handleGenerate} className="w-full">
          <Wand2 className="mr-2 w-4 h-4" />
          Gerar CNPJ
        </Button>
        
        <div className="space-y-2">
          <Input
            value={result}
            readOnly
            placeholder="CNPJ será gerado aqui"
            className="bg-gray-50"
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
