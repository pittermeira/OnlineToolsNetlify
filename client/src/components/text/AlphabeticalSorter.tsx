import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowDownAZ, ArrowUpAZ, Copy } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { sortAlphabetically } from "@/lib/text-utils";
import { useClipboard } from "@/hooks/useClipboard";

export default function AlphabeticalSorter() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const { copyToClipboard } = useClipboard();

  const handleSort = (order: 'asc' | 'desc') => {
    const sorted = sortAlphabetically(input, order);
    setResult(sorted);
  };

  return (
    <ToolCard
      title="Ordenação Alfabética"
      icon={<ArrowDownAZ className="text-primary w-6 h-6" />}
    >
      <div className="space-y-4">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite uma palavra por linha ou separadas por vírgula"
          className="min-h-[80px]"
        />
        
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={() => handleSort('asc')} className="text-sm">
            <ArrowDownAZ className="mr-1 w-4 h-4" />
            A-Z
          </Button>
          <Button onClick={() => handleSort('desc')} className="text-sm">
            <ArrowUpAZ className="mr-1 w-4 h-4" />
            Z-A
          </Button>
        </div>
        
        <div className="space-y-2">
          <Textarea
            value={result}
            readOnly
            placeholder="Lista ordenada aparecerá aqui"
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
              Copiar Lista Ordenada
            </Button>
          )}
        </div>
      </div>
    </ToolCard>
  );
}
