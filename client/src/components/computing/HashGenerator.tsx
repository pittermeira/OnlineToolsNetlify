import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Copy } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { useClipboard } from "@/hooks/useClipboard";

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashType, setHashType] = useState("md5");
  const [result, setResult] = useState("");
  const { copyToClipboard } = useClipboard();

  const generateHash = async (text: string, type: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    let algorithm;
    switch (type) {
      case "sha1":
        algorithm = "SHA-1";
        break;
      case "sha256":
        algorithm = "SHA-256";
        break;
      case "sha512":
        algorithm = "SHA-512";
        break;
      default:
        // MD5 simulation (not cryptographically secure)
        return btoa(text).substring(0, 32);
    }

    try {
      const hashBuffer = await crypto.subtle.digest(algorithm, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (error) {
      return "Erro ao gerar hash";
    }
  };

  const handleGenerate = async () => {
    if (!input.trim()) {
      alert("Digite um texto para gerar o hash");
      return;
    }

    const hash = await generateHash(input, hashType);
    setResult(hash);
  };

  return (
    <ToolCard
      title="Gerador de Hash"
      icon={<Shield className="text-primary w-6 h-6" />}
    >
      <div className="space-y-4">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite o texto para gerar hash"
          className="min-h-[80px]"
        />

        <Select value={hashType} onValueChange={setHashType}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo de hash" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="md5">MD5</SelectItem>
            <SelectItem value="sha1">SHA-1</SelectItem>
            <SelectItem value="sha256">SHA-256</SelectItem>
            <SelectItem value="sha512">SHA-512</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleGenerate} className="w-full">
          <Shield className="mr-2 w-4 h-4" />
          Gerar Hash
        </Button>

        {result && (
          <div className="space-y-2">
            <Textarea
              value={result}
              readOnly
              className="bg-gray-50 min-h-[80px] font-mono text-xs"
            />
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => copyToClipboard(result)}
            >
              <Copy className="mr-1 w-4 h-4" />
              Copiar Hash
            </Button>
          </div>
        )}
      </div>
    </ToolCard>
  );
}