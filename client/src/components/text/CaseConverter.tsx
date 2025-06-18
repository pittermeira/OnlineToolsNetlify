import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Type, Copy } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { convertCase } from "@/lib/text-utils";
import { useClipboard } from "@/hooks/useClipboard";

export default function CaseConverter() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const { copyToClipboard } = useClipboard();

  const handleConvert = (type: 'upper' | 'lower' | 'title' | 'sentence') => {
    const converted = convertCase(input, type);
    setResult(converted);
  };

  return (
    <ToolCard
      title="Conversor de Maiúsculas/Minúsculas"
      icon={<Type className="text-primary w-6 h-6" />}
    >
      <div className="space-y-4">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite seu texto aqui..."
          className="min-h-[80px]"
        />
        
        <div className="grid grid-cols-2 gap-2">
          <Button 
            onClick={() => handleConvert('upper')} 
            className="text-xs py-2"
          >
            MAIÚSCULAS
          </Button>
          <Button 
            onClick={() => handleConvert('lower')} 
            className="text-xs py-2"
          >
            minúsculas
          </Button>
          <Button 
            onClick={() => handleConvert('title')} 
            className="text-xs py-2"
          >
            Primeira Maiúscula
          </Button>
          <Button 
            onClick={() => handleConvert('sentence')} 
            className="text-xs py-2"
          >
            Apenas primeira
          </Button>
        </div>
        
        <div className="space-y-2">
          <Textarea
            value={result}
            readOnly
            placeholder="Resultado aparecerá aqui"
            className="bg-gray-50 min-h-[80px]"
          />
          {result && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => copyToClipboard(result)}
            >
              <Copy className="mr-1 w-4 h-4" />
              Copiar Resultado
            </Button>
          )}
        </div>
      </div>
    </ToolCard>
  );
}
