import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Wrench, Flag, Search, Sun, Moon } from "lucide-react";
import CategoryNav from "@/components/CategoryNav";

// Generators
import CPFGenerator from "@/components/generators/CPFGenerator";
import CNPJGenerator from "@/components/generators/CNPJGenerator";
import CEPGenerator from "@/components/generators/CEPGenerator";
import PasswordGenerator from "@/components/generators/PasswordGenerator";
import LoremGenerator from "@/components/generators/LoremGenerator";
import PersonGenerator from "@/components/generators/PersonGenerator";

// Validators
import CPFValidator from "@/components/validators/CPFValidator";
import CNPJValidator from "@/components/validators/CNPJValidator";
import EmailValidator from "@/components/validators/EmailValidator";

// Text Tools
import CharacterCounter from "@/components/text/CharacterCounter";
import CaseConverter from "@/components/text/CaseConverter";
import AccentRemover from "@/components/text/AccentRemover";
import AlphabeticalSorter from "@/components/text/AlphabeticalSorter";
import TextReverser from "@/components/text/TextReverser";
import OccurrenceCounter from "@/components/text/OccurrenceCounter";

// Computing Tools
import Base64Tool from "@/components/computing/Base64Tool";
import URLTool from "@/components/computing/URLTool";
import HashGenerator from "@/components/computing/HashGenerator";
import QRCodeGenerator from "@/components/computing/QRCodeGenerator";
import ColorPicker from "@/components/computing/ColorPicker";
import SystemInfo from "@/components/computing/SystemInfo";

// Math Tools
import GCDLCMCalculator from "@/components/math/GCDLCMCalculator";
import PercentageCalculator from "@/components/math/PercentageCalculator";
import AreaCalculator from "@/components/math/AreaCalculator";
import RomanConverter from "@/components/math/RomanConverter";
import FactorizationTool from "@/components/math/FactorizationTool";
import RuleOfThree from "@/components/math/RuleOfThree";

// Date Tools
import DateDifference from "@/components/dates/DateDifference";
import DateAddSubtract from "@/components/dates/DateAddSubtract";
import AgeCalculator from "@/components/dates/AgeCalculator";
import DayOfWeek from "@/components/dates/DayOfWeek";
import BusinessDaysCalculator from "@/components/dates/BusinessDaysCalculator";

// Additional Generators
import RGGenerator from "@/components/generators/RGGenerator";
import CNHGenerator from "@/components/generators/CNHGenerator";
import NamesGenerator from "@/components/generators/NamesGenerator";
import NicksGenerator from "@/components/generators/NicksGenerator";


const categories = [
  { id: "geradores", name: "Geradores", count: 10 },
  { id: "validadores", name: "Validadores", count: 3 },
  { id: "textos", name: "Textos", count: 6 },
  { id: "computacao", name: "Computação", count: 6 },
  { id: "matematica", name: "Matemática", count: 6 },
  { id: "datas", name: "Datas", count: 5 },
];

const allTools = [
  // Generators
  { id: "cpf-generator", name: "Gerador de CPF", category: "geradores", component: CPFGenerator },
  { id: "cnpj-generator", name: "Gerador de CNPJ", category: "geradores", component: CNPJGenerator },
  { id: "cep-generator", name: "Gerador de CEP", category: "geradores", component: CEPGenerator },
  { id: "password-generator", name: "Gerador de Senha", category: "geradores", component: PasswordGenerator },
  { id: "lorem-generator", name: "Gerador de Lorem Ipsum", category: "geradores", component: LoremGenerator },
  { id: "person-generator", name: "Gerador de Pessoas", category: "geradores", component: PersonGenerator },
  { id: "rg-generator", name: "Gerador de RG", category: "geradores", component: RGGenerator },
  { id: "cnh-generator", name: "Gerador de CNH", category: "geradores", component: CNHGenerator },
  { id: "names-generator", name: "Gerador de Nomes", category: "geradores", component: NamesGenerator },
  { id: "nicks-generator", name: "Gerador de Nicks", category: "geradores", component: NicksGenerator },

  // Validators
  { id: "cpf-validator", name: "Validador de CPF", category: "validadores", component: CPFValidator },
  { id: "cnpj-validator", name: "Validador de CNPJ", category: "validadores", component: CNPJValidator },
  { id: "email-validator", name: "Validador de Email", category: "validadores", component: EmailValidator },

  // Text Tools
  { id: "character-counter", name: "Contador de Caracteres", category: "textos", component: CharacterCounter },
  { id: "case-converter", name: "Maiúsculas e Minúsculas", category: "textos", component: CaseConverter },
  { id: "accent-remover", name: "Remover Acentos", category: "textos", component: AccentRemover },
  { id: "alphabetical-sorter", name: "Ordem Alfabética", category: "textos", component: AlphabeticalSorter },
  { id: "text-reverser", name: "Inverter Texto", category: "textos", component: TextReverser },
  { id: "occurrence-counter", name: "Contador de Ocorrências", category: "textos", component: OccurrenceCounter },

  // Computing Tools
  { id: "base64-tool", name: "Base64 Encode/Decode", category: "computacao", component: Base64Tool },
  { id: "url-tool", name: "URL Encode/Decode", category: "computacao", component: URLTool },
  { id: "hash-generator", name: "Gerador de Hash", category: "computacao", component: HashGenerator },
  { id: "qr-generator", name: "Gerador de QR Code", category: "computacao", component: QRCodeGenerator },
  { id: "color-picker", name: "Color Picker", category: "computacao", component: ColorPicker },
  { id: "system-info", name: "Informações do Sistema", category: "computacao", component: SystemInfo },

  // Math Tools
  { id: "gcd-lcm", name: "MDC e MMC", category: "matematica", component: GCDLCMCalculator },
  { id: "percentage", name: "Calculadora de Porcentagem", category: "matematica", component: PercentageCalculator },
  { id: "area-calculator", name: "Calculadora de Área", category: "matematica", component: AreaCalculator },
  { id: "roman-converter", name: "Conversor Romano", category: "matematica", component: RomanConverter },
  { id: "factorization", name: "Fatoração", category: "matematica", component: FactorizationTool },
  { id: "rule-of-three", name: "Regra de Três", category: "matematica", component: RuleOfThree },

  // Date Tools
  { id: "date-difference", name: "Diferença entre Datas", category: "datas", component: DateDifference },
  { id: "date-add-subtract", name: "Somar/Subtrair Datas", category: "datas", component: DateAddSubtract },
  { id: "age-calculator", name: "Calculadora de Idade", category: "datas", component: AgeCalculator },
  { id: "day-of-week", name: "Dia da Semana", category: "datas", component: DayOfWeek },
  { id: "business-days", name: "Calculadora de Dias Úteis", category: "datas", component: BusinessDaysCalculator },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("geradores");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const filteredTools = allTools.filter(tool => {
    const matchesCategory = activeCategory ? tool.category === activeCategory : true;
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-900 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wrench className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Ferramentas Online
              </h1>
              <Flag className="w-6 h-6 text-green-500" />
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Pesquisar ferramentas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>

              {/* Theme Toggle */}
              <Button variant="ghost" size="sm" onClick={toggleTheme}>
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Category Navigation */}
        <div className="mb-8">
          <CategoryNav
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => {
            const ToolComponent = tool.component;
            return (
              <div key={tool.id}>
                <ToolComponent />
              </div>
            );
          })}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Nenhuma ferramenta encontrada para "{searchTerm}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}