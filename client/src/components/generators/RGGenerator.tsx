
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IdCard, Copy, Wand2 } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { useClipboard } from "@/hooks/useClipboard";

export default function RGGenerator() {
  const [result, setResult] = useState("");
  const { copyToClipboard } = useClipboard();

  const generateRG = () => {
    const rg = Math.floor(Math.random() * 900000000) + 100000000;
    const rgString = rg.toString();
    const formatted = `${rgString.substring(0, 2)}.${rgString.substring(2, 5)}.${rgString.substring(5, 8)}-${rgString.substring(8)}`;
    setResult(formatted);
  };

  return (
    <ToolCard
      title="Gerador de RG"
      icon={<IdCard className="text-primary w-6 h-6" />}
    >
      <div className="space-y-4">
        <Button onClick={generateRG} className="w-full">
          <Wand2 className="mr-2 w-4 h-4" />
          Gerar RG
        </Button>
        
        <div className="space-y-2">
          <Input
            value={result}
            readOnly
            placeholder="RG será gerado aqui"
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
