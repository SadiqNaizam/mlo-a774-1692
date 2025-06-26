import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface ControlPanelProps {
  colors: [string, string, string];
  speed: number;
  blur: number;
  size: number;
  onColorChange: (index: number, color: string) => void;
  onSpeedChange: (value: number) => void;
  onBlurChange: (value: number) => void;
  onSizeChange: (value: number) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  colors,
  speed,
  blur,
  size,
  onColorChange,
  onSpeedChange,
  onBlurChange,
  onSizeChange,
}) => {
  console.log('ControlPanel loaded');

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Control Panel</CardTitle>
        <CardDescription>Adjust the animation properties in real-time.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">Animation Settings</h3>
          
          <div className="grid gap-2">
            <Label htmlFor="speed">Animation Speed</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="speed"
                min={1}
                max={10}
                step={0.5}
                value={[speed]}
                onValueChange={(value) => onSpeedChange(value[0])}
                aria-label="Animation Speed"
              />
              <span className="text-sm font-mono w-12 text-center bg-muted rounded-md px-2 py-1">{speed.toFixed(1)}s</span>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="blur">Gooeyness (Blur)</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="blur"
                min={5}
                max={50}
                step={1}
                value={[blur]}
                onValueChange={(value) => onBlurChange(value[0])}
                aria-label="Gooeyness"
              />
              <span className="text-sm font-mono w-12 text-center bg-muted rounded-md px-2 py-1">{blur}</span>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="size">Dot Size</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="size"
                min={50}
                max={150}
                step={5}
                value={[size]}
                onValueChange={(value) => onSizeChange(value[0])}
                aria-label="Dot Size"
              />
              <span className="text-sm font-mono w-12 text-center bg-muted rounded-md px-2 py-1">{size}px</span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">Dot Colors</h3>
          <div className="grid grid-cols-3 gap-4">
            {colors.map((color, index) => (
              <div key={index} className="grid gap-2 items-center justify-items-center">
                <Label htmlFor={`color-${index + 1}`} className="text-xs">Dot {index + 1}</Label>
                <Input
                  id={`color-${index + 1}`}
                  type="color"
                  value={color}
                  onChange={(e) => onColorChange(index, e.target.value)}
                  className="p-1 h-12 w-12 cursor-pointer"
                  aria-label={`Dot ${index + 1} color`}
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ControlPanel;