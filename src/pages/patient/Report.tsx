import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Brain, 
  FileText, 
  Download, 
  Share2, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Target,
  Activity
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Report = () => {
  const navigate = useNavigate();
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate AI analysis progress
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          return 100;
        }
        return prev + 15;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const reportData = {
    patientId: "PAT-2024-001",
    analysisDate: new Date().toLocaleDateString(),
    migrainetype: "Migraine with Aura",
    confidence: 89,
    severity: "Moderate to Severe",
    recommendations: [
      "Avoid bright lights and loud sounds during episodes",
      "Maintain regular sleep schedule (7-8 hours)",
      "Stay hydrated (8-10 glasses of water daily)",
      "Consider prophylactic medication consultation",
      "Keep a migraine diary to identify triggers"
    ],
    findings: {
      mriAnalysis: "No structural abnormalities detected. Mild ventricular asymmetry noted.",
      symptoms: "Classic migraine pattern with visual aura preceding headache",
      riskFactors: "Family history, stress, irregular sleep patterns"
    }
  };

  if (!isComplete) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Brain className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
            <CardTitle>AI Analysis in Progress</CardTitle>
            <CardDescription>
              Processing your MRI scans and symptoms...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Analysis Progress</span>
                <span>{analysisProgress}%</span>
              </div>
              <Progress value={analysisProgress} className="h-2" />
              <div className="text-xs text-muted-foreground text-center">
                {analysisProgress < 30 && "Analyzing MRI scans..."}
                {analysisProgress >= 30 && analysisProgress < 60 && "Processing symptom data..."}
                {analysisProgress >= 60 && analysisProgress < 90 && "Generating predictions..."}
                {analysisProgress >= 90 && "Finalizing report..."}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <FileText className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">AI Analysis Report</span>
            </div>
            <p className="text-muted-foreground">
              Comprehensive migraine analysis based on MRI and symptoms
            </p>
          </div>

          {/* Report Status */}
          <Card className="mb-8 border-secondary/50 bg-secondary/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-secondary" />
                  <div>
                    <h3 className="font-semibold">Analysis Complete</h3>
                    <p className="text-sm text-muted-foreground">
                      Report generated on {reportData.analysisDate}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {reportData.confidence}% Confidence
                </Badge>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Report */}
            <div className="lg:col-span-2 space-y-6">
              {/* Diagnosis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5" />
                    <span>Primary Diagnosis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-2">
                        {reportData.migrainetype}
                      </h3>
                      <p className="text-muted-foreground">
                        Based on AI analysis of MRI patterns and symptom correlation
                      </p>
                    </div>
                    <Separator />
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Severity Level</Label>
                        <p className="text-lg">{reportData.severity}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Patient ID</Label>
                        <p className="text-lg">{reportData.patientId}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Findings */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Findings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">MRI Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        {reportData.findings.mriAnalysis}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Symptom Pattern</h4>
                      <p className="text-sm text-muted-foreground">
                        {reportData.findings.symptoms}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Risk Factors</h4>
                      <p className="text-sm text-muted-foreground">
                        {reportData.findings.riskFactors}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>AI Recommendations</span>
                  </CardTitle>
                  <CardDescription>
                    Personalized suggestions based on your analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {reportData.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-4 w-4 text-secondary mt-0.5" />
                        <p className="text-sm">{rec}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Report Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">AI Analysis</span>
                      <CheckCircle className="h-4 w-4 text-secondary" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Doctor Review</span>
                      <Clock className="h-4 w-4 text-yellow-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Final Report</span>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Analysis Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Confidence Level:</span>
                      <span className="font-medium">{reportData.confidence}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Analysis Type:</span>
                      <span className="font-medium">MRI + Symptoms</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Processing Time:</span>
                      <span className="font-medium">2.3 seconds</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Report
                  </Button>
                  <Button 
                    className="w-full shadow-medical"
                    onClick={() => navigate("/patient/dashboard")}
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    View Dashboard
                  </Button>
                </CardContent>
              </Card>

              {/* Notice */}
              <Card className="border-yellow-500/50 bg-yellow-500/10">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Pending Doctor Review</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        A healthcare professional will review and enhance this report within 24 hours.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={`text-xs font-medium text-muted-foreground ${className}`}>
    {children}
  </span>
);

export default Report;