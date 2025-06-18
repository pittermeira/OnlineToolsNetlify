import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QrCode, Download, Wand2 } from "lucide-react";
import ToolCard from "@/components/ToolCard";

export default function QRCodeGenerator() {
  const [text, setText] = useState("");
  const [size, setSize] = useState("200");
  const [qrUrl, setQrUrl] = useState("");

  const handleGenerate = () => {
    if (!text.trim()) {
      alert('Digite um texto ou URL');
      return;
    }
    
    const encodedText = encodeURIComponent(text);
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}`;
    setQrUrl(url);
  };

  const handleDownload = () => {
    if (!qrUrl) {
      alert('Gere um QR Code primeiro');
      return;
    }
    
    const link = document.createElement('a');
    link.download = `qrcode-${Date.now()}.png`;
    link.href = qrUrl;
    link.click();
  };

  return (
    <ToolCard
      title="Gerador de QR Code"
      icon={<QrCode className="text-primary w-6 h-6" />}
    >
      <div className="space-y-4">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Digite o texto ou URL"
        />
        
        <div>
          <label className="block text-sm text-gray-600 mb-1">Tamanho</label>
          <Select value={size} onValueChange={setSize}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="200">200x200</SelectItem>
              <SelectItem value="300">300x300</SelectItem>
              <SelectItem value="400">400x400</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={handleGenerate} className="w-full">
          <Wand2 className="mr-2 w-4 h-4" />
          Gerar QR Code
        </Button>
        
        <div className="border border-gray-300 rounded-lg bg-gray-50 p-4 text-center min-h-[200px] flex items-center justify-center">
          {qrUrl ? (
            <img src={qrUrl} alt="QR Code" className="mx-auto rounded-lg shadow-md max-w-full" />
          ) : (
            <span className="text-gray-500">QR Code aparecerá aqui</span>
          )}
        </div>
        
        {qrUrl && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={handleDownload}
          >
            <Download className="mr-1 w-4 h-4" />
            Baixar QR Code
          </Button>
        )}
      </div>
    </ToolCard>
  );
}
