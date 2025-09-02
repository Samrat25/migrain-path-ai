import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Brain, Activity, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { api, getSession } from "@/lib/api";

const Symptoms = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [symptoms, setSymptoms] = useState<Record<string, boolean>>({});
  const [painLevel, setPainLevel] = useState([5]);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");

  const symptomsList = [
    { id: "headache", label: "Throbbing headache" },
    { id: "nausea", label: "Nausea" },
    { id: "vomiting", label: "Vomiting" },
    { id: "light_sensitivity", label: "Light sensitivity (photophobia)" },
    { id: "sound_sensitivity", label: "Sound sensitivity (phonophobia)" },
    { id: "visual_disturbance", label: "Visual disturbances/aura" },
    { id: "dizziness", label: "Dizziness" },
    { id: "neck_stiffness", label: "Neck stiffness" },
    { id: "fatigue", label: "Fatigue" },
    { id: "mood_changes", label: "Mood changes/irritability" },
    { id: "appetite_changes", label: "Changes in appetite" },
    { id: "cognitive_issues", label: "Difficulty concentrating" }
  ];

  const handleSymptomChange = (symptomId: string, checked: boolean) => {
    setSymptoms(prev => ({
      ...prev,
      [symptomId]: checked
    }));
  };

  const handleSubmit = async () => {
    const selectedSymptoms = Object.keys(symptoms).filter(key => symptoms[key]);
    
    if (selectedSymptoms.length === 0) {
      toast({
        title: "No Symptoms Selected",
        description: "Please select at least one symptom to continue.",
        variant: "destructive"
      });
      return;
    }

    const session = getSession();
    if (!session) {
      toast({ title: "Not logged in", description: "Please login again.", variant: "destructive" });
      navigate("/login");
      return;
    }
    try {
      const text = [
        ...selectedSymptoms,
        additionalInfo && `notes:${additionalInfo}`,
        duration && `duration:${duration}`,
        location && `location:${location}`,
        `pain:${painLevel[0]}`,
      ].filter(Boolean).join(", ");
      await api.saveSymptoms(session.id, text);
      await api.generateReport(session.id);
      toast({
        title: "Symptoms Recorded",
        description: "Generating migrant report...",
      });
      navigate("/patient/report");
    } catch (e: any) {
      toast({ title: "Failed to save symptoms", description: e.message, variant: "destructive" });
    }
  };

  const selectedCount = Object.values(symptoms).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">Current Symptoms</span>
            </div>
            <p className="text-muted-foreground">
              Record your current symptoms for comprehensive AI analysis
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Symptoms */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>Select Current Symptoms</span>
                  </CardTitle>
                  <CardDescription>
                    Check all symptoms you are currently experiencing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {symptomsList.map((symptom) => (
                      <div key={symptom.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={symptom.id}
                          checked={symptoms[symptom.id] || false}
                          onCheckedChange={(checked) => 
                            handleSymptomChange(symptom.id, checked as boolean)
                          }
                        />
                        <Label 
                          htmlFor={symptom.id}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {symptom.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Additional Details */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Additional Information</CardTitle>
                  <CardDescription>
                    Provide more details about your current condition
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="additional">Additional symptoms or notes</Label>
                    <Textarea
                      id="additional"
                      placeholder="Describe any other symptoms, triggers, or relevant information..."
                      value={additionalInfo}
                      onChange={(e) => setAdditionalInfo(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* Pain Level */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pain Level</CardTitle>
                  <CardDescription>Rate your current pain (1-10)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="px-2">
                      <Slider
                        value={painLevel}
                        onValueChange={setPainLevel}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    <div className="text-center">
                      <span className="text-2xl font-bold text-primary">{painLevel[0]}/10</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        {painLevel[0] <= 3 ? "Mild" : 
                         painLevel[0] <= 6 ? "Moderate" : 
                         painLevel[0] <= 8 ? "Severe" : "Extreme"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Duration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-lg">Duration</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="e.g., 2 hours, since morning"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </CardContent>
              </Card>

              {/* Location */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-lg">Pain Location</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="e.g., left temple, forehead"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </CardContent>
              </Card>

              {/* Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Symptoms selected:</span>
                      <span className="font-medium">{selectedCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pain level:</span>
                      <span className="font-medium">{painLevel[0]}/10</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-8">
            <Button
              onClick={handleSubmit}
              size="lg"
              className="shadow-medical"
              disabled={selectedCount === 0}
            >
              Generate AI Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Symptoms;