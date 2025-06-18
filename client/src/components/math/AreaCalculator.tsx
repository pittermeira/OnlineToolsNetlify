import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Square, Calculator } from "lucide-react";
import ToolCard from "@/components/ToolCard";

export default function AreaCalculator() {
  const [shape, setShape] = useState("square");
  const [dimensions, setDimensions] = useState<{[key: string]: number}>({
    side: 0,
    length: 0,
    width: 0,
    radius: 0,
    base: 0,
    height: 0,
    majorBase: 0,
    minorBase: 0,
    majorDiagonal: 0,
    minorDiagonal: 0
  });
  const [result, setResult] = useState<number | null>(null);

  const calculateArea = () => {
    let area = 0;

    switch (shape) {
      case "square":
        area = dimensions.side * dimensions.side;
        break;
      case "rectangle":
        area = dimensions.length * dimensions.width;
        break;
      case "circle":
        area = Math.PI * dimensions.radius * dimensions.radius;
        break;
      case "triangle":
        area = (dimensions.base * dimensions.height) / 2;
        break;
      case "trapezoid":
        area = ((dimensions.majorBase + dimensions.minorBase) * dimensions.height) / 2;
        break;
      case "rhombus":
        area = (dimensions.majorDiagonal * dimensions.minorDiagonal) / 2;
        break;
    }

    setResult(Math.round(area * 100) / 100);
  };

  const updateDimension = (key: string, value: number) => {
    setDimensions({...dimensions, [key]: value});
  };

  const renderInputs = () => {
    switch (shape) {
      case "square":
        return (
          <Input
            type="number"
            value={dimensions.side}
            onChange={(e) => updateDimension("side", Number(e.target.value))}
            placeholder="Lado"
          />
        );
      case "rectangle":
        return (
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              value={dimensions.length}
              onChange={(e) => updateDimension("length", Number(e.target.value))}
              placeholder="Comprimento"
            />
            <Input
              type="number"
              value={dimensions.width}
              onChange={(e) => updateDimension("width", Number(e.target.value))}
              placeholder="Largura"
            />
          </div>
        );
      case "circle":
        return (
          <Input
            type="number"
            value={dimensions.radius}
            onChange={(e) => updateDimension("radius", Number(e.target.value))}
            placeholder="Raio"
          />
        );
      case "triangle":
        return (
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              value={dimensions.base}
              onChange={(e) => updateDimension("base", Number(e.target.value))}
              placeholder="Base"
            />
            <Input
              type="number"
              value={dimensions.height}
              onChange={(e) => updateDimension("height", Number(e.target.value))}
              placeholder="Altura"
            />
          </div>
        );
      case "trapezoid":
        return (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                value={dimensions.majorBase}
                onChange={(e) => updateDimension("majorBase", Number(e.target.value))}
                placeholder="Base Maior"
              />
              <Input
                type="number"
                value={dimensions.minorBase}
                onChange={(e) => updateDimension("minorBase", Number(e.target.value))}
                placeholder="Base Menor"
              />
            </div>
            <Input
              type="number"
              value={dimensions.height}
              onChange={(e) => updateDimension("height", Number(e.target.value))}
              placeholder="Altura"
            />
          </div>
        );
      case "rhombus":
        return (
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              value={dimensions.majorDiagonal}
              onChange={(e) => updateDimension("majorDiagonal", Number(e.target.value))}
              placeholder="Diagonal Maior"
            />
            <Input
              type="number"
              value={dimensions.minorDiagonal}
              onChange={(e) => updateDimension("minorDiagonal", Number(e.target.value))}
              placeholder="Diagonal Menor"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <ToolCard
      title="Calculadora de Área"
      icon={<Square className="text-primary w-6 h-6" />}
    >
      <div className="space-y-4">
        <Select value={shape} onValueChange={setShape}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="square">Quadrado</SelectItem>
            <SelectItem value="rectangle">Retângulo</SelectItem>
            <SelectItem value="circle">Círculo</SelectItem>
            <SelectItem value="triangle">Triângulo</SelectItem>
            <SelectItem value="trapezoid">Trapézio</SelectItem>
            <SelectItem value="rhombus">Losango</SelectItem>
          </SelectContent>
        </Select>

        {renderInputs()}

        <Button onClick={calculateArea} className="w-full">
          <Calculator className="mr-2 w-4 h-4" />
          Calcular Área
        </Button>

        {result !== null && (
          <div className="p-3 border border-gray-300 rounded-lg bg-gray-50 text-center">
            <div className="font-semibold text-lg">{result}</div>
            <div className="text-gray-600 text-sm">unidades²</div>
          </div>
        )}
      </div>
    </ToolCard>
  );
}