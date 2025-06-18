import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Lock, Unlock, Copy } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { useClipboard } from "@/hooks/useClipboard";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const { copyToClipboard } = useClipboard();

  const handleEncode = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)));
      setResult(encoded);
    } catch (e) {
      setResult("Erro ao codificar");
    }
  };

  const handleDecode = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(input)));
      setResult(decoded);
    } catch (e) {
      setResult("Erro ao decodificar: Entrada inválida para Base64");
    }
  };

  return (
    <ToolCard
      title="Base64 Encode/Decode"
      icon={<Lock className="text-primary w-6 h-6" />}
    >
      <div className="space-y-4">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite o texto para codificar/decodificar"
          className="min-h-[80px]"
        />
        
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={handleEncode} className="text-sm">
            <Lock className="mr-1 w-4 h-4" />
            Encode
          </Button>
          <Button onClick={handleDecode} className="text-sm bg-success hover:bg-success/90">
            <Unlock className="mr-1 w-4 h-4" />
            Decode
          </Button>
        </div>
        
        <div className="space-y-2">
          <Textarea
            value={result}
            readOnly
            placeholder="Resultado aparecerá aqui"
            className="bg-gray-50 min-h-[80px] font-mono text-xs"
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
