import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeftRight, Copy, Wand2 } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { reverseText } from "@/lib/text-utils";
import { useClipboard } from "@/hooks/useClipboard";

export default function TextReverser() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const { copyToClipboard } = useClipboard();

  const handleReverse = () => {
    const reversed = reverseText(input);
    setResult(reversed);
  };

  return (
    <ToolCard
      title="Inverter Texto"
      icon={<ArrowLeftRight className="text-primary w-6 h-6" />}
    >
      <div className="space-y-4">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite o texto para inverter"
          className="min-h-[80px]"
        />
        
        <Button onClick={handleReverse} className="w-full">
          <Wand2 className="mr-2 w-4 h-4" />
          Inverter Texto
        </Button>
        
        <div className="space-y-2">
          <Textarea
            value={result}
            readOnly
            placeholder="Texto invertido aparecerá aqui"
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
              Copiar Texto Invertido
            </Button>
          )}
        </div>
      </div>
    </ToolCard>
  );
}
