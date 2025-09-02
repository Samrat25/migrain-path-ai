import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import WorkflowStep from "@/components/workflow/WorkflowStep";
import FeatureCard from "@/components/features/FeatureCard";
import { 
  UserCheck, 
  ClipboardList, 
  Upload, 
  Stethoscope, 
  Brain, 
  FileText, 
  Users, 
  Calendar,
  Shield,
  Zap,
  Target,
  Activity
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-medical.jpg";

const Index = () => {
  const navigate = useNavigate();
  const workflowSteps = [
    {
      icon: UserCheck,
      title: "Patient Registration",
      description: "Secure registration with HIPAA-compliant data protection",
      stepNumber: 1
    },
    {
      icon: ClipboardList,
      title: "Migraine Survey",
      description: "Complete comprehensive survey to detect migraine type and patterns",
      stepNumber: 2
    },
    {
      icon: Upload,
      title: "MRI Upload",
      description: "Upload brain MRI scans for AI-powered migraine prediction analysis",
      stepNumber: 3
    },
    {
      icon: Stethoscope,
      title: "Symptom Entry",
      description: "Record current symptoms and triggers for accurate assessment",
      stepNumber: 4
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Advanced AI generates comprehensive report combining MRI and symptoms",
      stepNumber: 5
    },
    {
      icon: FileText,
      title: "Doctor Review",
      description: "Healthcare professionals review and enhance AI-generated reports",
      stepNumber: 6
    }
  ];

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze MRI scans and symptoms for accurate migraine prediction",
      highlight: true
    },
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Enterprise-grade security ensuring patient data privacy and regulatory compliance"
    },
    {
      icon: Users,
      title: "Multi-Role Dashboard",
      description: "Tailored interfaces for patients, doctors, and administrators with role-based access"
    },
    {
      icon: Zap,
      title: "Real-time Reports",
      description: "Instant generation of comprehensive reports combining AI analysis with clinical expertise"
    },
    {
      icon: Target,
      title: "Preventive Goals",
      description: "Personalized prevention strategies and lifestyle recommendations based on analysis"
    },
    {
      icon: Calendar,
      title: "Health Camps",
      description: "Community health programs with easy discovery and registration for patients"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="text-primary border-primary/50">
                  AI-Powered Healthcare
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Revolutionizing{" "}
                  <span className="bg-gradient-medical bg-clip-text text-transparent">
                    Migraine Care
                  </span>{" "}
                  with AI
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Advanced AI analysis of MRI scans and symptoms, combined with expert medical review, 
                  delivering personalized migraine management and prevention strategies.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="shadow-glow" onClick={() => navigate("/login")}>
                  <Activity className="mr-2 h-5 w-5" />
                  Start Analysis
                </Button>
                <Button variant="outline" size="lg">
                  <FileText className="mr-2 h-5 w-5" />
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="AI-powered medical analysis showing brain scans and modern healthcare technology"
                className="rounded-2xl shadow-medical w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-medical opacity-10 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Complete Patient Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From registration to personalized treatment plans, our platform guides patients 
              through every step of comprehensive migraine care.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            {workflowSteps.map((step, index) => (
              <WorkflowStep key={index} {...step} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Powerful Features for Better Care
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive platform combines cutting-edge AI technology with 
              clinical expertise to deliver superior migraine management.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-medical text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Transform Migraine Care?
          </h2>
          <p className="text-xl opacity-90 mb-8 leading-relaxed">
            Join healthcare professionals and patients already using our AI-powered platform 
            for better migraine diagnosis and treatment outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="shadow-lg" onClick={() => navigate("/login")}>
              <Users className="mr-2 h-5 w-5" />
              For Healthcare Providers
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" onClick={() => navigate("/login")}>
              <UserCheck className="mr-2 h-5 w-5" />
              For Patients
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
