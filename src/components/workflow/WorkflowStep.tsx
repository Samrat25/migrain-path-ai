import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface WorkflowStepProps {
  icon: LucideIcon;
  title: string;
  description: string;
  stepNumber: number;
  isActive?: boolean;
}

const WorkflowStep = ({ icon: Icon, title, description, stepNumber, isActive = false }: WorkflowStepProps) => {
  return (
    <Card className={`relative transition-all duration-300 ${isActive ? 'ring-2 ring-primary shadow-glow' : 'hover:shadow-medical'}`}>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
            isActive ? 'bg-gradient-medical text-white' : 'bg-accent text-accent-foreground'
          }`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm font-medium text-muted-foreground">Step {stepNumber}</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowStep;