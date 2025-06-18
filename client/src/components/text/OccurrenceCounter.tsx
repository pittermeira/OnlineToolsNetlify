import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { countOccurrences } from "@/lib/text-utils";

export default function OccurrenceCounter() {
  const [text, setText] = useState("");
  const [word, setWord] = useState("");
  const [count, setCount] = useState(0);

  const handleCount = () => {
    const occurrences = countOccurrences(text, word);
    setCount(occurrences);
  };

  return (
    <ToolCard
      title="Contador de Ocorrências"
      icon={<Search className="text-primary w-6 h-6" />}
    >
      <div className="space-y-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Digite o texto para análise"
          className="min-h-[80px]"
        />
        
        <Input
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Palavra a procurar"
        />
        
        <Button onClick={handleCount} className="w-full">
          <Search className="mr-2 w-4 h-4" />
          Contar Ocorrências
        </Button>
        
        <div className="p-3 border border-gray-300 rounded-lg bg-gray-50 text-center">
          <div className="font-semibold text-lg">{count}</div>
          <div className="text-gray-600 text-sm">ocorrências encontradas</div>
        </div>
      </div>
    </ToolCard>
  );
}
