import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  highlight?: boolean;
}

const FeatureCard = ({ icon: Icon, title, description, highlight = false }: FeatureCardProps) => {
  return (
    <Card className={`h-full transition-all duration-300 hover:shadow-medical ${
      highlight ? 'border-primary/50 bg-gradient-to-br from-accent/30 to-transparent' : ''
    }`}>
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            highlight ? 'bg-gradient-medical text-white' : 'bg-accent text-accent-foreground'
          }`}>
            <Icon className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;