import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Users, 
  Clock, 
  FileText, 
  Search,
  Filter,
  Eye,
  Edit,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Activity
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const pendingReports = [
    {
      id: "RPT-001",
      patientName: "Sarah Johnson",
      patientId: "PAT-2024-001",
      submittedAt: "2 hours ago",
      migrainetype: "Migraine with Aura",
      confidence: 89,
      priority: "Medium",
      status: "pending_review"
    },
    {
      id: "RPT-002",
      patientName: "Michael Chen",
      patientId: "PAT-2024-002",
      submittedAt: "4 hours ago",
      migrainetype: "Tension Headache",
      confidence: 76,
      priority: "Low",
      status: "pending_review"
    },
    {
      id: "RPT-003",
      patientName: "Emma Wilson",
      patientId: "PAT-2024-003",
      submittedAt: "1 day ago",
      migrainetype: "Cluster Headache",
      confidence: 94,
      priority: "High",
      status: "pending_review"
    }
  ];

  const recentActivity = [
    { action: "Report reviewed", patient: "John Doe", time: "1 hour ago" },
    { action: "Treatment plan updated", patient: "Jane Smith", time: "3 hours ago" },
    { action: "New patient registered", patient: "Bob Johnson", time: "5 hours ago" },
    { action: "Report approved", patient: "Alice Brown", time: "1 day ago" }
  ];

  const stats = {
    totalPatients: 247,
    pendingReviews: 8,
    completedToday: 15,
    averageConfidence: 87
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "destructive";
      case "Medium": return "default";
      case "Low": return "secondary";
      default: return "default";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Doctor Dashboard</span>
          </div>
          <p className="text-muted-foreground">
            Review AI-generated reports and manage patient care
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Patients</p>
                  <p className="text-2xl font-bold">{stats.totalPatients}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Reviews</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pendingReviews}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed Today</p>
                  <p className="text-2xl font-bold text-secondary">{stats.completedToday}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Confidence</p>
                  <p className="text-2xl font-bold">{stats.averageConfidence}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full md:w-auto md:grid-cols-3">
            <TabsTrigger value="pending">Pending Reviews</TabsTrigger>
            <TabsTrigger value="patients">All Patients</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Pending Reports */}
            <div className="space-y-4">
              {pendingReports.map((report) => (
                <Card key={report.id} className="hover:shadow-medical transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <h3 className="text-lg font-semibold">{report.patientName}</h3>
                          <Badge variant="outline">{report.patientId}</Badge>
                          <Badge variant={getPriorityColor(report.priority)}>
                            {report.priority} Priority
                          </Badge>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Diagnosis:</span>
                            <p className="font-medium">{report.migrainetype}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Confidence:</span>
                            <p className="font-medium">{report.confidence}%</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Submitted:</span>
                            <p className="font-medium">{report.submittedAt}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/doctor/review/${report.id}`)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Review
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => navigate(`/doctor/review/${report.id}`)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Report
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="patients">
            <Card>
              <CardHeader>
                <CardTitle>All Patients</CardTitle>
                <CardDescription>
                  Complete patient database with treatment history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  Patient management interface coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>
                  Treatment outcomes and system performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  Analytics dashboard coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recent Activity Sidebar */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">Patient: {activity.patient}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;