
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ToolCard from "@/components/ToolCard";
import axios from "axios";
import { MapPin, Copy } from "lucide-react";
import { useClipboard } from "@/hooks/useClipboard";

export default function CEPGenerator() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { copyToClipboard } = useClipboard();

  // Lista de CEPs válidos conhecidos de diferentes estados do Brasil
  const validCEPs = [
    "01310-100", // São Paulo - SP
    "20040-020", // Rio de Janeiro - RJ
    "30112-000", // Belo Horizonte - MG
    "40070-110", // Salvador - BA
    "80010-000", // Curitiba - PR
    "90010-150", // Porto Alegre - RS
    "70040-010", // Brasília - DF
    "60160-230", // Fortaleza - CE
    "50030-230", // Recife - PE
    "69005-040", // Manaus - AM
    "66035-000", // Belém - PA
    "74015-100", // Goiânia - GO
    "78005-100", // Cuiabá - MT
    "79002-230", // Campo Grande - MS
    "88010-400", // Florianópolis - SC
    "64000-040", // Teresina - PI
    "65025-540", // São Luís - MA
    "72010-100", // Brasília - DF
    "29010-120", // Vitória - ES
    "57020-050", // Maceió - AL
    "49010-390", // Aracaju - SE
    "58013-390", // João Pessoa - PB
    "59012-300", // Natal - RN
    "68906-440", // Macapá - AP
    "77001-002", // Palmas - TO
    "69301-380", // Boa Vista - RR
    "76801-059", // Porto Velho - RO
    "79008-971", // Campo Grande - MS
    "24020-040", // Niterói - RJ
    "13015-900"  // Campinas - SP
  ];

  const getRandomCEP = (): string => {
    const randomIndex = Math.floor(Math.random() * validCEPs.length);
    return validCEPs[randomIndex];
  };

  const handleGenerate = async () => {
    setLoading(true);
    const randomCEP = getRandomCEP();
    
    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${randomCEP}/json/`
      );
      
      if (response.data && !response.data.erro) {
        setResult(response.data);
      } else {
        // Fallback: tenta outro CEP se o primeiro falhar
        const fallbackCEP = getRandomCEP();
        const fallbackResponse = await axios.get(
          `https://viacep.com.br/ws/${fallbackCEP}/json/`
        );
        setResult(fallbackResponse.data);
      }
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
      setResult({ erro: "Erro ao conectar com a API" });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyAll = () => {
    if (!result || result.erro) return;

    const text = `CEP: ${result.cep}
Endereço: ${result.logradouro}
Bairro: ${result.bairro}
Cidade: ${result.localidade}
Estado: ${result.uf}
Endereço Completo: ${result.logradouro}, ${result.bairro}, ${result.localidade} - ${result.uf}`;

    copyToClipboard(text);
  };

  return (
    <ToolCard
      title="Gerador de CEP"
      icon={<MapPin className="text-primary w-6 h-6" />}
    >
      <div className="space-y-4">
        <Button 
          onClick={handleGenerate} 
          disabled={loading}
          className="w-full"
        >
          {loading ? "Buscando..." : "Gerar Endereço Real"}
        </Button>

        {result && !result.erro && (
          <div className="space-y-2">
            <div className="p-3 border border-gray-300 rounded-lg bg-gray-50 text-sm space-y-1">
              <div>
                <strong>CEP:</strong> {result.cep}
              </div>
              <div>
                <strong>Endereço:</strong> {result.logradouro || "Não informado"}
              </div>
              <div>
                <strong>Bairro:</strong> {result.bairro || "Não informado"}
              </div>
              <div>
                <strong>Cidade:</strong> {result.localidade}
              </div>
              <div>
                <strong>Estado:</strong> {result.uf}
              </div>
              <div className="pt-2 border-t">
                <strong>Endereço Completo:</strong>
                <br />
                {`${result.logradouro || "Endereço não especificado"}, ${result.bairro || "Bairro não especificado"}, ${result.localidade} - ${result.uf}`}
              </div>
            </div>
            
            <Button 
              onClick={handleCopyAll}
              variant="outline" 
              size="sm" 
              className="w-full"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copiar Tudo
            </Button>
          </div>
        )}

        {result && result.erro && (
          <div className="p-3 border border-red-300 rounded-lg bg-red-50 text-red-700 text-center">
            {result.erro === "true" ? "CEP não encontrado" : result.erro}
          </div>
        )}

        {!result && !loading && (
          <div className="p-3 border border-gray-300 rounded-lg bg-gray-50 text-center text-gray-500">
            Clique em "Gerar Endereço Real" para ver um endereço válido
          </div>
        )}
      </div>
    </ToolCard>
  );
}
