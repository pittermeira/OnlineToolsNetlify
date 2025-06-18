
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Copy, Wand2 } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { useClipboard } from "@/hooks/useClipboard";

export default function NamesGenerator() {
  const [gender, setGender] = useState("random");
  const [result, setResult] = useState("");
  const { copyToClipboard } = useClipboard();

  const maleNames = ['João', 'José', 'Pedro', 'Paulo', 'Carlos', 'Luis', 'Marcos', 'Rafael', 'Felipe', 'Bruno', 'Gabriel', 'Lucas', 'Mateus', 'André', 'Rodrigo'];
  const femaleNames = ['Maria', 'Ana', 'Francisca', 'Antônia', 'Adriana', 'Juliana', 'Márcia', 'Fernanda', 'Patricia', 'Aline', 'Camila', 'Beatriz', 'Larissa', 'Bruna', 'Carla'];
  const lastNames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Rocha'];

  const generateName = () => {
    let selectedGender = gender;
    if (gender === "random") {
      selectedGender = Math.random() > 0.5 ? "male" : "female";
    }
    
    const firstNames = selectedGender === "male" ? maleNames : femaleNames;
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const lastName2 = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    setResult(`${firstName} ${lastName} ${lastName2}`);
  };

  return (
    <ToolCard
      title="Gerador de Nomes"
      icon={<User className="text-primary w-6 h-6" />}
    >
      <div className="space-y-4">
        <Select value={gender} onValueChange={setGender}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="random">Aleatório</SelectItem>
            <SelectItem value="male">Masculino</SelectItem>
            <SelectItem value="female">Feminino</SelectItem>
          </SelectContent>
        </Select>
        
        <Button onClick={generateName} className="w-full">
          <Wand2 className="mr-2 w-4 h-4" />
          Gerar Nome
        </Button>
        
        <div className="space-y-2">
          <Input
            value={result}
            readOnly
            placeholder="Nome será gerado aqui"
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
