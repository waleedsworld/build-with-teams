
import React from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, Clock, FileText, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const tasks = [
  {
    id: 1,
    title: "Design System Updates",
    deadline: "2025-05-01",
    type: "Design",
    status: "In Progress"
  },
  {
    id: 2,
    title: "Frontend Development",
    deadline: "2025-05-15",
    type: "Development",
    status: "Pending"
  },
  {
    id: 3,
    title: "UI/UX Review",
    deadline: "2025-04-28",
    type: "Design",
    status: "In Progress"
  }
];

const DashboardPage = () => {
  const handleMarkComplete = (taskId: number) => {
    console.log("Marking task complete:", taskId);
    // Would integrate with backend in a real implementation
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container pt-20 px-4">
        <h1 className="text-3xl font-bold mb-8">Employee Dashboard</h1>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tasks.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {tasks.filter(t => t.status === "In Progress").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {tasks.filter(t => t.status === "Completed").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Task List */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks.map(task => (
                <div 
                  key={task.id} 
                  className="flex items-center justify-between p-4 border rounded-lg bg-card"
                >
                  <div className="space-y-1">
                    <h3 className="font-medium">{task.title}</h3>
                    <div className="text-sm text-muted-foreground">
                      Type: {task.type} • Due: {task.deadline}
                    </div>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      task.status === "Completed" 
                        ? "bg-green-100 text-green-800" 
                        : task.status === "In Progress" 
                        ? "bg-blue-100 text-blue-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {task.status}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => handleMarkComplete(task.id)}
                    disabled={task.status === "Completed"}
                  >
                    Mark Complete
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
