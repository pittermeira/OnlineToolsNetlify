import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ReactNode } from "react";

interface ToolCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export default function ToolCard({ title, icon, children }: ToolCardProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
