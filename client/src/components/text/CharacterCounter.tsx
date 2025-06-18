import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Hash } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { getTextStats } from "@/lib/text-utils";

export default function CharacterCounter() {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({ characters: 0, words: 0, lines: 0, paragraphs: 0 });

  useEffect(() => {
    const newStats = getTextStats(text);
    setStats(newStats);
  }, [text]);

  return (
    <ToolCard
      title="Contador de Caracteres"
      icon={<Hash className="text-primary w-6 h-6" />}
    >
      <div className="space-y-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Digite ou cole seu texto aqui..."
          className="min-h-[120px]"
        />
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <div className="font-semibold text-lg">{stats.characters}</div>
            <div className="text-gray-600 text-sm">Caracteres</div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <div className="font-semibold text-lg">{stats.words}</div>
            <div className="text-gray-600 text-sm">Palavras</div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <div className="font-semibold text-lg">{stats.lines}</div>
            <div className="text-gray-600 text-sm">Linhas</div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <div className="font-semibold text-lg">{stats.paragraphs}</div>
            <div className="text-gray-600 text-sm">Parágrafos</div>
          </div>
        </div>
      </div>
    </ToolCard>
  );
}
