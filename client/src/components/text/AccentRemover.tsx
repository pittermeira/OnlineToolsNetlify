import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Strikethrough, Copy, Wand2 } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { removeAccents } from "@/lib/text-utils";
import { useClipboard } from "@/hooks/useClipboard";

export default function AccentRemover() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const { copyToClipboard } = useClipboard();

  const handleRemoveAccents = () => {
    const converted = removeAccents(input);
    setResult(converted);
  };

  return (
    <ToolCard
      title="Remover Acentos"
      icon={<Strikethrough className="text-primary w-6 h-6" />}
    >
      <div className="space-y-4">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite texto com acentos (ção, ã, é, etc.)"
          className="min-h-[80px]"
        />
        
        <Button onClick={handleRemoveAccents} className="w-full">
          <Wand2 className="mr-2 w-4 h-4" />
          Remover Acentos
        </Button>
        
        <div className="space-y-2">
          <Textarea
            value={result}
            readOnly
            placeholder="Texto sem acentos aparecerá aqui"
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
