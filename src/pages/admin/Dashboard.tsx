import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Shield, 
  Users, 
  Calendar, 
  Database,
  Plus,
  MapPin,
  Clock,
  UserCheck,
  Activity,
  TrendingUp,
  BarChart3
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [isCreateCampOpen, setIsCreateCampOpen] = useState(false);

  const healthCamps = [
    {
      id: "HC-001",
      name: "Downtown Medical Center Screening",
      location: "Downtown Medical Center, Main St",
      date: "2024-03-15",
      time: "09:00 AM - 05:00 PM",
      registered: 45,
      capacity: 100,
      status: "upcoming"
    },
    {
      id: "HC-002", 
      name: "Community Health Fair",
      location: "Central Park Community Center",
      date: "2024-03-22",
      time: "10:00 AM - 04:00 PM",
      registered: 67,
      capacity: 80,
      status: "upcoming"
    },
    {
      id: "HC-003",
      name: "University Campus Screening",
      location: "State University Health Center",
      date: "2024-03-08",
      time: "08:00 AM - 06:00 PM",
      registered: 120,
      capacity: 150,
      status: "completed"
    }
  ];

  const systemStats = {
    totalUsers: 1247,
    totalDoctors: 89,
    totalPatients: 1158,
    reportsGenerated: 3456,
    healthCamps: 12,
    avgResponseTime: "2.3s"
  };

  const createHealthCamp = (formData: FormData) => {
    toast({
      title: "Health Camp Created",
      description: "New health camp has been successfully created and published.",
    });
    setIsCreateCampOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "default";
      case "completed": return "secondary";
      case "cancelled": return "destructive";
      default: return "default";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold">Admin Dashboard</span>
              </div>
              <p className="text-muted-foreground">
                System management and health camp coordination
              </p>
            </div>
            <Dialog open={isCreateCampOpen} onOpenChange={setIsCreateCampOpen}>
              <DialogTrigger asChild>
                <Button className="shadow-medical">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Health Camp
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Health Camp</DialogTitle>
                  <DialogDescription>
                    Set up a new health screening camp for the community
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  createHealthCamp(new FormData(e.currentTarget));
                }} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="campName">Camp Name</Label>
                    <Input id="campName" name="campName" placeholder="e.g., Downtown Health Screening" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" name="location" placeholder="e.g., Community Center, 123 Main St" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" name="date" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="capacity">Capacity</Label>
                      <Input id="capacity" name="capacity" type="number" placeholder="100" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      placeholder="Brief description of the health camp..."
                      className="min-h-[80px]"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsCreateCampOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Create Camp</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{systemStats.totalUsers}</p>
                <p className="text-xs text-muted-foreground">Total Users</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <UserCheck className="h-6 w-6 text-secondary mx-auto mb-2" />
                <p className="text-2xl font-bold">{systemStats.totalDoctors}</p>
                <p className="text-xs text-muted-foreground">Doctors</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <Activity className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{systemStats.totalPatients}</p>
                <p className="text-xs text-muted-foreground">Patients</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <Database className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{systemStats.reportsGenerated}</p>
                <p className="text-xs text-muted-foreground">Reports</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <Calendar className="h-6 w-6 text-secondary mx-auto mb-2" />
                <p className="text-2xl font-bold">{systemStats.healthCamps}</p>
                <p className="text-xs text-muted-foreground">Health Camps</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <TrendingUp className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{systemStats.avgResponseTime}</p>
                <p className="text-xs text-muted-foreground">Avg Response</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="camps" className="space-y-6">
          <TabsList className="grid w-full md:w-auto md:grid-cols-4">
            <TabsTrigger value="camps">Health Camps</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="reports">System Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="camps" className="space-y-6">
            <div className="grid gap-6">
              {healthCamps.map((camp) => (
                <Card key={camp.id} className="hover:shadow-medical transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <h3 className="text-lg font-semibold">{camp.name}</h3>
                          <Badge variant={getStatusColor(camp.status)}>
                            {camp.status}
                          </Badge>
                        </div>
                        <div className="grid md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{camp.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{camp.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{camp.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{camp.registered}/{camp.capacity} registered</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage doctors, patients, and system administrators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  User management interface coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>System Reports</CardTitle>
                <CardDescription>
                  Generate and view system performance reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  System reports interface coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>System Analytics</span>
                </CardTitle>
                <CardDescription>
                  Platform usage and performance metrics
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
      </div>
    </div>
  );
};

export default AdminDashboard;