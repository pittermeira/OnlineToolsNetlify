import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Palette, Copy } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { useClipboard } from "@/hooks/useClipboard";

export default function ColorPicker() {
  const [color, setColor] = useState("#3b82f6");
  const { copyToClipboard } = useClipboard();

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const hexToHsl = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;
    
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const rgb = hexToRgb(color);
  const hsl = hexToHsl(color);

  return (
    <ToolCard
      title="Seletor de Cores"
      icon={<Palette className="text-primary w-6 h-6" />}
    >
      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-16 h-10 border rounded cursor-pointer"
          />
          <Input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="#000000"
            className="flex-1"
          />
        </div>
        
        <div 
          className="w-full h-20 rounded border"
          style={{ backgroundColor: color }}
        />
        
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span className="font-medium">HEX:</span>
            <div className="flex items-center gap-2">
              <span className="font-mono">{color.toUpperCase()}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(color.toUpperCase())}
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          </div>
          
          {rgb && (
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="font-medium">RGB:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono">{`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
          )}
          
          {hsl && (
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="font-medium">HSL:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono">{`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolCard>
  );
}
