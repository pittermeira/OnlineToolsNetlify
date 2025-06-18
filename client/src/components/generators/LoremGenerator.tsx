import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Copy, Wand2 } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { generateLorem } from "@/lib/generators";
import { useClipboard } from "@/hooks/useClipboard";

export default function LoremGenerator() {
  const [result, setResult] = useState("");
  const [type, setType] = useState<'words' | 'sentences' | 'paragraphs'>('paragraphs');
  const [count, setCount] = useState(3);
  const { copyToClipboard } = useClipboard();

  const handleGenerate = () => {
    const lorem = generateLorem(type, count);
    setResult(lorem);
  };

  return (
    <ToolCard
      title="Lorem Ipsum"
      icon={<FileText className="text-primary w-6 h-6" />}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Tipo</label>
          <Select value={type} onValueChange={(value: 'words' | 'sentences' | 'paragraphs') => setType(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paragraphs">Parágrafos</SelectItem>
              <SelectItem value="words">Palavras</SelectItem>
              <SelectItem value="sentences">Sentenças</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm text-gray-600 mb-1">Quantidade</label>
          <Input
            type="number"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
            min="1"
            max="50"
          />
        </div>
        
        <Button onClick={handleGenerate} className="w-full">
          <Wand2 className="mr-2 w-4 h-4" />
          Gerar Texto
        </Button>
        
        <div className="space-y-2">
          <Textarea
            value={result}
            readOnly
            placeholder="Lorem ipsum será gerado aqui"
            className="bg-gray-50 min-h-[120px]"
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
