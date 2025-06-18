import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Copy, Wand2 } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { generatePerson } from "@/lib/generators";
import { useClipboard } from "@/hooks/useClipboard";
import axios from "axios";

export default function PersonGenerator() {
  const [result, setResult] = useState<any>(null);
  const [gender, setGender] = useState<'male' | 'female' | 'random'>('random');
  const [loading, setLoading] = useState(false);
  const { copyToClipboard } = useClipboard();

  // Lista de CEPs válidos conhecidos
  const validCEPs = [
    "01310-100", "20040-020", "30112-000", "40070-110", "80010-000",
    "90010-150", "70040-010", "60160-230", "50030-230", "69005-040",
    "66035-000", "74015-100", "78005-100", "79002-230", "88010-400",
    "64000-040", "65025-540", "72010-100", "29010-120", "57020-050",
    "49010-390", "58013-390", "59012-300", "68906-440", "77001-002",
    "69301-380", "76801-059", "79008-971", "24020-040", "13015-900"
  ];

  const getRandomCEP = (): string => {
    const randomIndex = Math.floor(Math.random() * validCEPs.length);
    return validCEPs[randomIndex];
  };

  const getRealAddress = async () => {
    const randomCEP = getRandomCEP();
    
    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${randomCEP}/json/`
      );
      
      if (response.data && !response.data.erro) {
        return {
          cep: response.data.cep,
          street: response.data.logradouro || "Endereço não especificado",
          neighborhood: response.data.bairro || "Bairro não especificado",
          city: response.data.localidade,
          state: response.data.uf
        };
      } else {
        // Fallback: tenta outro CEP se o primeiro falhar
        const fallbackCEP = getRandomCEP();
        const fallbackResponse = await axios.get(
          `https://viacep.com.br/ws/${fallbackCEP}/json/`
        );
        return {
          cep: fallbackResponse.data.cep,
          street: fallbackResponse.data.logradouro || "Endereço não especificado",
          neighborhood: fallbackResponse.data.bairro || "Bairro não especificado",
          city: fallbackResponse.data.localidade,
          state: fallbackResponse.data.uf
        };
      }
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
      // Fallback para endereço fictício em caso de erro
      return {
        cep: "00000-000",
        street: "Endereço não disponível",
        neighborhood: "Bairro não disponível",
        city: "Cidade não disponível",
        state: "Estado não disponível"
      };
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      // Gera a pessoa com dados básicos
      const person = generatePerson(gender);
      
      // Busca endereço real da API
      const realAddress = await getRealAddress();
      
      // Substitui o endereço fictício pelo real
      const personWithRealAddress = {
        ...person,
        address: realAddress
      };
      
      setResult(personWithRealAddress);
    } catch (error) {
      console.error("Erro ao gerar pessoa:", error);
      // Em caso de erro, gera com endereço fictício
      const person = generatePerson(gender);
      setResult(person);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyAll = () => {
    if (!result) return;

    const text = `Nome: ${result.name}
Idade: ${result.age} anos
CPF: ${result.cpf}
Telefone: ${result.phone}
Email: ${result.email}
Sexo: ${result.gender}`;

    copyToClipboard(text);
  };

  return (
    <ToolCard
      title="Gerador de Pessoa"
      icon={<User className="text-primary w-6 h-6" />}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Sexo</label>
          <Select value={gender} onValueChange={(value: 'male' | 'female' | 'random') => setGender(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="random">Aleatório</SelectItem>
              <SelectItem value="male">Masculino</SelectItem>
              <SelectItem value="female">Feminino</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleGenerate} className="w-full" disabled={loading}>
          <Wand2 className="mr-2 w-4 h-4" />
          {loading ? "Gerando..." : "Gerar Pessoa"}
        </Button>

        {result && (
          <div className="space-y-2">
            <div className="p-3 border border-gray-300 rounded-lg bg-gray-50 text-sm space-y-1 max-h-96 overflow-y-auto">
              <div><strong>Nome:</strong> {result.name}</div>
              <div><strong>Idade:</strong> {result.age} anos</div>
              <div><strong>Sexo:</strong> {result.gender}</div>
              <div><strong>CPF:</strong> {result.cpf}</div>
              <div><strong>RG:</strong> {result.rg}</div>
              <div><strong>Signo:</strong> {result.sign}</div>

              <div className="pt-2 border-t">
                <div className="font-semibold text-gray-700 mb-1">Filiação:</div>
                <div><strong>Mãe:</strong> {result.mother}</div>
                <div><strong>Pai:</strong> {result.father}</div>
              </div>

              <div className="pt-2 border-t">
                <div className="font-semibold text-gray-700 mb-1">Contato:</div>
                <div><strong>Email:</strong> {result.email}</div>
                <div><strong>Senha:</strong> {result.password}</div>
                <div><strong>Celular:</strong> {result.phone}</div>
              </div>

              <div className="pt-2 border-t">
                <div className="font-semibold text-gray-700 mb-1">Endereço:</div>
                <div><strong>CEP:</strong> {result.address.cep}</div>
                <div><strong>Endereço:</strong> {result.address.street}</div>
                <div><strong>Bairro:</strong> {result.address.neighborhood}</div>
                <div><strong>Cidade:</strong> {result.address.city}</div>
                <div><strong>Estado:</strong> {result.address.state}</div>
              </div>

              <div className="pt-2 border-t">
                <div className="font-semibold text-gray-700 mb-1">Características Físicas:</div>
                <div><strong>Altura:</strong> {result.physical.height}</div>
                <div><strong>Peso:</strong> {result.physical.weight}</div>
                <div><strong>Tipo Sanguíneo:</strong> {result.physical.bloodType}</div>
              </div>

              <div className="pt-2 border-t">
                <div><strong>Cor Favorita:</strong> {result.favoriteColor}</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => copyToClipboard(JSON.stringify(result, null, 2))}
            >
              <Copy className="mr-1 w-4 h-4" />
              Copiar Dados
            </Button>
          </div>
        )}
      </div>
    </ToolCard>
  );
}