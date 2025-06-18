
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shuffle, Copy, Wand2 } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { useClipboard } from "@/hooks/useClipboard";

export default function NicksGenerator() {
  const [result, setResult] = useState("");
  const { copyToClipboard } = useClipboard();

  const generateNick = () => {
    const prefixes = [
      "Dark", "Shadow", "Fire", "Ice", "Lightning", "Storm", "Blood", "Death", "Dragon", "Wolf",
      "Eagle", "Tiger", "Lion", "Bear", "Shark", "Viper", "Raven", "Phoenix", "Falcon", "Hawk",
      "Cyber", "Neo", "Ultra", "Mega", "Super", "Hyper", "Elite", "Master", "Legend", "Hero",
      "Ninja", "Samurai", "Warrior", "Knight", "Mage", "Wizard", "Demon", "Angel", "Ghost", "Spirit",
      "Thunder", "Frost", "Blaze", "Void", "Chaos", "Order", "Steel", "Iron", "Gold", "Silver",
      "Crystal", "Diamond", "Ruby", "Emerald", "Sapphire", "Pearl", "Onyx", "Jade", "Amber", "Opal",
      "Cosmic", "Stellar", "Lunar", "Solar", "Radiant", "Mystic", "Epic", "Royal", "Noble", "Divine",
      "Savage", "Wild", "Fierce", "Brutal", "Deadly", "Fatal", "Lethal", "Vicious", "Ruthless", "Merciless",
      "Swift", "Quick", "Fast", "Rapid", "Speedy", "Flash", "Blur", "Dash", "Rush", "Sprint",
      "Silent", "Stealth", "Hidden", "Secret", "Phantom", "Invisible", "Masked", "Cloaked", "Shrouded", "Veiled",
      "Toxic", "Venom", "Poison", "Acid", "Corrosive", "Lethal", "Deadly", "Fatal", "Destructive", "Explosive"
    ];

    const suffixes = [
      "Slayer", "Hunter", "Killer", "Destroyer", "Crusher", "Breaker", "Striker", "Fighter", "Warrior", "Guardian",
      "Master", "Lord", "King", "Emperor", "Champion", "Hero", "Legend", "Myth", "God", "Titan",
      "Blade", "Sword", "Axe", "Hammer", "Spear", "Arrow", "Bow", "Shield", "Armor", "Crown",
      "Storm", "Thunder", "Lightning", "Fire", "Ice", "Wind", "Earth", "Water", "Light", "Dark",
      "Beast", "Dragon", "Wolf", "Tiger", "Lion", "Eagle", "Hawk", "Falcon", "Raven", "Phoenix",
      "Shadow", "Ghost", "Spirit", "Soul", "Heart", "Mind", "Eye", "Hand", "Fist", "Claw",
      "Born", "Made", "Forged", "Created", "Chosen", "Blessed", "Cursed", "Marked", "Branded", "Scarred",
      "Walker", "Runner", "Rider", "Driver", "Pilot", "Captain", "Admiral", "General", "Commander", "Leader",
      "Seeker", "Finder", "Hunter", "Tracker", "Scout", "Spy", "Agent", "Assassin", "Thief", "Rogue",
      "Mancer", "Weaver", "Bringer", "Keeper", "Warden", "Guard", "Protector", "Defender", "Savior", "Redeemer"
    ];

    const numbers = ["", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "13", "21", "42", "69", "99", "100", "123", "777", "888", "999"];
    const symbols = ["", "_", "X", "xX", "Xx", "XX", "!", "@", "#", "$", "%", "&", "*", "+", "-", "="];

    // Gerar nick aleatório
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const number = numbers[Math.floor(Math.random() * numbers.length)];
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];

    let nick = "";
    
    // Diferentes formatos de nick
    const formats = [
      `${prefix}${suffix}`,
      `${prefix}${suffix}${number}`,
      `${prefix}${symbol}${suffix}`,
      `${prefix}${suffix}${symbol}${number}`,
      `${symbol}${prefix}${suffix}${symbol}`,
      `${number}${prefix}${suffix}`,
      `${prefix}${number}${suffix}`,
      `${prefix.toLowerCase()}${suffix.toLowerCase()}`,
      `${prefix.toUpperCase()}${suffix.toUpperCase()}`,
      `${prefix}_${suffix}`,
      `${prefix}-${suffix}`,
      `${prefix}.${suffix}`,
      `xX${prefix}${suffix}Xx`,
      `${prefix}${suffix}Gaming`,
      `${prefix}${suffix}Pro`,
      `${prefix}${suffix}YT`,
      `${prefix}${suffix}TV`,
      `The${prefix}${suffix}`,
      `${prefix}${suffix}Official`,
      `${prefix}${suffix}Real`
    ];

    nick = formats[Math.floor(Math.random() * formats.length)];
    
    // Adicionar variações adicionais para atingir 100k combinações
    if (Math.random() < 0.3) {
      const extraNumbers = ["2023", "2024", "01", "02", "03", "10", "11", "12", "20", "30"];
      nick += extraNumbers[Math.floor(Math.random() * extraNumbers.length)];
    }

    if (Math.random() < 0.2) {
      const extraSymbols = ["_", "x", "X", "!", "?", "*", "+"];
      nick = extraSymbols[Math.floor(Math.random() * extraSymbols.length)] + nick;
    }

    setResult(nick);
  };

  return (
    <ToolCard
      title="Gerador de Nicks"
      icon={<Shuffle className="text-primary w-6 h-6" />}
    >
      <div className="space-y-4">
        <Button onClick={generateNick} className="w-full">
          <Wand2 className="mr-2 w-4 h-4" />
          Gerar Nick
        </Button>
        
        <div className="space-y-2">
          <Input
            value={result}
            readOnly
            placeholder="Nick será gerado aqui"
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
        
        <div className="text-xs text-gray-500 text-center">
          Mais de 100.000 combinações únicas de nicks disponíveis
        </div>
      </div>
    </ToolCard>
  );
}
