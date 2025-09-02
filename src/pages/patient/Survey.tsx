import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Brain, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Survey = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    {
      id: "frequency",
      title: "How often do you experience migraines?",
      type: "radio",
      options: [
        { value: "daily", label: "Daily" },
        { value: "weekly", label: "Weekly" },
        { value: "monthly", label: "Monthly" },
        { value: "rarely", label: "Rarely (less than monthly)" }
      ]
    },
    {
      id: "duration",
      title: "How long do your migraines typically last?",
      type: "radio",
      options: [
        { value: "hours", label: "A few hours" },
        { value: "halfday", label: "Half a day" },
        { value: "fullday", label: "Full day" },
        { value: "multiple", label: "Multiple days" }
      ]
    },
    {
      id: "intensity",
      title: "How would you rate your migraine pain intensity?",
      type: "radio",
      options: [
        { value: "mild", label: "Mild (1-3/10)" },
        { value: "moderate", label: "Moderate (4-6/10)" },
        { value: "severe", label: "Severe (7-8/10)" },
        { value: "extreme", label: "Extreme (9-10/10)" }
      ]
    },
    {
      id: "location",
      title: "Where is your migraine pain typically located?",
      type: "radio",
      options: [
        { value: "unilateral", label: "One side of head" },
        { value: "bilateral", label: "Both sides of head" },
        { value: "forehead", label: "Forehead area" },
        { value: "back", label: "Back of head" }
      ]
    },
    {
      id: "symptoms",
      title: "Which additional symptoms do you experience?",
      type: "radio",
      options: [
        { value: "nausea", label: "Nausea and vomiting" },
        { value: "sensitivity", label: "Light and sound sensitivity" },
        { value: "visual", label: "Visual disturbances (aura)" },
        { value: "multiple", label: "Multiple symptoms" }
      ]
    },
    {
      id: "triggers",
      title: "What are your common migraine triggers?",
      type: "textarea",
      placeholder: "Describe your common triggers (stress, certain foods, weather changes, etc.)"
    }
  ];

  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete survey
      toast({
        title: "Survey Completed",
        description: "Processing your responses to determine migraine type...",
      });
      setTimeout(() => {
        navigate("/patient/mri-upload");
      }, 2000);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentQuestion = questions[currentStep];
  const hasAnswer = answers[currentQuestion.id];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">Migraine Assessment Survey</span>
            </div>
            <p className="text-muted-foreground">
              Help us understand your migraine patterns to provide better analysis
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Question {currentStep + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">{currentQuestion.title}</CardTitle>
              <CardDescription>
                Select the option that best describes your experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentQuestion.type === "radio" ? (
                <RadioGroup
                  value={answers[currentQuestion.id] || ""}
                  onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
                  className="space-y-3"
                >
                  {currentQuestion.options?.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label 
                        htmlFor={option.value} 
                        className="text-sm font-normal cursor-pointer flex-1"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <Textarea
                  placeholder={currentQuestion.placeholder}
                  value={answers[currentQuestion.id] || ""}
                  onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                  className="min-h-[120px]"
                />
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!hasAnswer}
              className="shadow-medical"
            >
              {currentStep === questions.length - 1 ? "Complete Survey" : "Next"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Survey;