import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Shuffle, 
  CheckCircle, 
  Edit, 
  Laptop, 
  Calculator, 
  Calendar 
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  count: number;
  icon: string;
}

interface CategoryNavProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const categoryIcons = {
  geradores: Shuffle,
  validadores: CheckCircle,
  textos: Edit,
  computacao: Laptop,
  matematica: Calculator,
  datas: Calendar,
};

export default function CategoryNav({ categories, activeCategory, onCategoryChange }: CategoryNavProps) {
  return (
    <Card className="overflow-x-auto">
      <div className="flex border-b">
        {categories.map((category) => {
          const Icon = categoryIcons[category.id as keyof typeof categoryIcons];
          const isActive = category.id === activeCategory;
          
          return (
            <Button
              key={category.id}
              variant="ghost"
              className={`
                px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap rounded-none
                ${isActive 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                }
              `}
              onClick={() => onCategoryChange(category.id)}
            >
              <Icon className="mr-2 w-4 h-4" />
              {category.name} ({category.count})
            </Button>
          );
        })}
      </div>
    </Card>
  );
}
