
import { useState } from "react";
import { Navigation } from "@/components/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  MessageSquare,
  Bell,
  Plus,
  Search
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Types
type TaskStatus = "Not Started" | "In Progress" | "Review" | "Completed";
type TeamMember = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: "online" | "offline" | "away";
};
type Task = {
  id: string;
  title: string;
  description: string;
  assignee: string;
  status: TaskStatus;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
};
type Message = {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  read: boolean;
};
type Notification = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
};

// Dummy data
const teamMembers: TeamMember[] = [
  { id: "1", name: "Alex Johnson", role: "CTO", avatar: "/placeholder.svg", status: "online" },
  { id: "2", name: "Sarah Miller", role: "Designer", avatar: "/placeholder.svg", status: "online" },
  { id: "3", name: "Mike Chen", role: "Developer", avatar: "/placeholder.svg", status: "away" },
  { id: "4", name: "Emily Davis", role: "Project Manager", avatar: "/placeholder.svg", status: "offline" },
  { id: "5", name: "Carlos Rodriguez", role: "QA Engineer", avatar: "/placeholder.svg", status: "online" },
];

const tasks: Task[] = [
  {
    id: "task1",
    title: "Design System Updates",
    description: "Update the design system components to match the new brand guidelines",
    assignee: "2", // Sarah
    status: "In Progress",
    dueDate: "2025-05-10",
    priority: "High"
  },
  {
    id: "task2",
    title: "API Integration",
    description: "Connect the frontend with the payment processing API",
    assignee: "3", // Mike
    status: "Not Started",
    dueDate: "2025-05-15",
    priority: "Medium"
  },
  {
    id: "task3",
    title: "User Testing",
    description: "Conduct user testing on the new checkout flow",
    assignee: "5", // Carlos
    status: "Not Started",
    dueDate: "2025-05-20",
    priority: "Medium"
  },
  {
    id: "task4",
    title: "Sprint Planning",
    description: "Prepare backlog and plan the next sprint",
    assignee: "4", // Emily
    status: "Completed",
    dueDate: "2025-05-01",
    priority: "High"
  },
  {
    id: "task5",
    title: "Tech Stack Review",
    description: "Evaluate current tech stack and recommend improvements",
    assignee: "1", // Alex
    status: "Review",
    dueDate: "2025-05-05",
    priority: "Low"
  },
];

const messages: Message[] = [
  {
    id: "msg1",
    sender: "2", // Sarah
    content: "I've finished the homepage design, please take a look when you get a chance.",
    timestamp: "9:30 AM",
    read: false
  },
  {
    id: "msg2",
    sender: "1", // Alex
    content: "Team meeting at 2 PM today to discuss the project timeline.",
    timestamp: "8:45 AM",
    read: true
  },
  {
    id: "msg3",
    sender: "3", // Mike
    content: "Having issues with the API integration, can someone help?",
    timestamp: "Yesterday",
    read: true
  },
];

const notifications: Notification[] = [
  {
    id: "notif1",
    title: "New task assigned",
    description: "You've been assigned to 'User Testing'",
    timestamp: "1 hour ago",
    read: false
  },
  {
    id: "notif2",
    title: "Meeting reminder",
    description: "Team stand-up in 15 minutes",
    timestamp: "15 minutes ago",
    read: false
  },
  {
    id: "notif3",
    title: "Task completed",
    description: "Mike marked 'Database Setup' as completed",
    timestamp: "Yesterday",
    read: true
  },
];

export default function WorkspacePage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tasks' | 'calendar' | 'messages'>('dashboard');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState('');
  
  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case "Not Started": return "bg-gray-200 text-gray-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Review": return "bg-yellow-100 text-yellow-800";
      case "Completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-200 text-gray-800";
    }
  };
  
  const getPriorityColor = (priority: "Low" | "Medium" | "High") => {
    switch (priority) {
      case "Low": return "bg-slate-100 text-slate-800";
      case "Medium": return "bg-orange-100 text-orange-800";
      case "High": return "bg-red-100 text-red-800";
      default: return "bg-slate-100 text-slate-800";
    }
  };

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      // In a real app, this would send the message
      console.log("Sending message:", chatInput);
      setChatInput('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navigation />
      
      <div className="pt-16 flex min-h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 hidden md:block">
          {/* Team Members */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <h3 className="font-medium text-sm mb-3 text-slate-500 dark:text-slate-400">TEAM MEMBERS</h3>
            <div className="space-y-3">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-2">
                  <div className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-800 
                      ${member.status === 'online' ? 'bg-green-500' : 
                        member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'}`} 
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Task list */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-sm text-slate-500 dark:text-slate-400">TASKS</h3>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {tasks.slice(0, 3).map((task) => (
                <div 
                  key={task.id}
                  className="p-2 text-sm rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                  onClick={() => setSelectedTaskId(task.id)}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium truncate">{task.title}</p>
                    <Badge variant="outline" className={`text-[10px] ${getStatusColor(task.status)}`}>
                      {task.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
              {tasks.length > 3 && (
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                  View all tasks ({tasks.length})
                </Button>
              )}
            </div>
          </div>
          
          {/* Notifications */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-sm text-slate-500 dark:text-slate-400">NOTIFICATIONS</h3>
              <Badge variant="secondary" className="text-xs">
                {notifications.filter(n => !n.read).length}
              </Badge>
            </div>
            <div className="space-y-2">
              {notifications.slice(0, 3).map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-2 text-sm rounded-md cursor-pointer ${!notification.read ? 'bg-slate-100 dark:bg-slate-700' : ''}`}
                >
                  <p className="font-medium">{notification.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{notification.description}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{notification.timestamp}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header Tabs */}
          <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-4 py-4">
              <h1 className="text-xl font-bold">Workspace</h1>
              <div className="hidden md:flex">
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden flex">
                  <Button 
                    variant={activeTab === 'dashboard' ? 'default' : 'ghost'} 
                    onClick={() => setActiveTab('dashboard')}
                    className="rounded-none px-3"
                  >
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                  <Button 
                    variant={activeTab === 'tasks' ? 'default' : 'ghost'} 
                    onClick={() => setActiveTab('tasks')}
                    className="rounded-none px-3"
                  >
                    <CheckSquare className="h-4 w-4 mr-2" />
                    Tasks
                  </Button>
                  <Button 
                    variant={activeTab === 'calendar' ? 'default' : 'ghost'} 
                    onClick={() => setActiveTab('calendar')}
                    className="rounded-none px-3"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Calendar
                  </Button>
                  <Button 
                    variant={activeTab === 'messages' ? 'default' : 'ghost'} 
                    onClick={() => setActiveTab('messages')}
                    className="rounded-none px-3"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Messages
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
              </div>
            </div>
            {/* Mobile Tab Bar */}
            <div className="flex md:hidden items-center justify-between border-t border-slate-200 dark:border-slate-700 overflow-x-auto">
              <Button 
                variant="ghost" 
                onClick={() => setActiveTab('dashboard')}
                className={`flex-1 flex-col h-14 rounded-none ${activeTab === 'dashboard' ? 'border-b-2 border-primary' : ''}`}
              >
                <LayoutDashboard className="h-5 w-5 mb-1" />
                <span className="text-xs">Dashboard</span>
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setActiveTab('tasks')}
                className={`flex-1 flex-col h-14 rounded-none ${activeTab === 'tasks' ? 'border-b-2 border-primary' : ''}`}
              >
                <CheckSquare className="h-5 w-5 mb-1" />
                <span className="text-xs">Tasks</span>
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setActiveTab('calendar')}
                className={`flex-1 flex-col h-14 rounded-none ${activeTab === 'calendar' ? 'border-b-2 border-primary' : ''}`}
              >
                <Calendar className="h-5 w-5 mb-1" />
                <span className="text-xs">Calendar</span>
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setActiveTab('messages')}
                className={`flex-1 flex-col h-14 rounded-none ${activeTab === 'messages' ? 'border-b-2 border-primary' : ''}`}
              >
                <MessageSquare className="h-5 w-5 mb-1" />
                <span className="text-xs">Messages</span>
              </Button>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="flex-1 p-4 sm:p-6 overflow-auto">
            {activeTab === 'dashboard' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Current Tasks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tasks.filter(t => t.status !== "Completed").map((task) => {
                        const assignee = teamMembers.find(m => m.id === task.assignee);
                        return (
                          <div key={task.id} className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">{task.title}</h4>
                                <Badge variant="outline" className={getPriorityColor(task.priority)}>
                                  {task.priority}
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{task.description}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline" className={getStatusColor(task.status)}>
                                  {task.status}
                                </Badge>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                  Due: {new Date(task.dueDate).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            {assignee && (
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={assignee.avatar} />
                                <AvatarFallback>{assignee.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Team Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {messages.map((message) => {
                        const sender = teamMembers.find(m => m.id === message.sender);
                        return (
                          <div key={message.id} className="flex items-start gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                            {sender && (
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={sender.avatar} />
                                <AvatarFallback>{sender.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            )}
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-sm">{sender?.name}</p>
                                <span className="text-xs text-slate-500 dark:text-slate-400">{message.timestamp}</span>
                              </div>
                              <p className="text-sm mt-1">{message.content}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-3">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full" variant="outline">
                            Schedule a Meeting
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Schedule a Meeting</DialogTitle>
                          </DialogHeader>
                          <div className="p-4">
                            <p>Form to schedule a meeting would go here...</p>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full" variant="outline">
                            Assign Task
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Assign a New Task</DialogTitle>
                          </DialogHeader>
                          <div className="p-4">
                            <p>Form to assign a task would go here...</p>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full" variant="outline">
                            Project Updates
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Project Updates</DialogTitle>
                          </DialogHeader>
                          <div className="p-4">
                            <p>Project updates would go here...</p>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeTab === 'tasks' && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <h2 className="text-xl font-bold">All Tasks</h2>
                  <div className="flex items-center gap-2">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Task
                    </Button>
                  </div>
                </div>
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Task</TableHead>
                          <TableHead>Assignee</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Priority</TableHead>
                          <TableHead>Due Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tasks.map((task) => {
                          const assignee = teamMembers.find(m => m.id === task.assignee);
                          return (
                            <TableRow key={task.id} className="cursor-pointer" onClick={() => setSelectedTaskId(task.id)}>
                              <TableCell className="font-medium">{task.title}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={assignee?.avatar} />
                                    <AvatarFallback>{assignee?.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span>{assignee?.name}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className={getStatusColor(task.status)}>
                                  {task.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className={getPriorityColor(task.priority)}>
                                  {task.priority}
                                </Badge>
                              </TableCell>
                              <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeTab === 'calendar' && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <h2 className="text-xl font-bold">Calendar</h2>
                  <div className="flex items-center gap-2">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Event
                    </Button>
                  </div>
                </div>
                <Card>
                  <CardContent className="p-6">
                    <div className="h-[500px] grid grid-cols-7 gap-1">
                      {Array.from({ length: 35 }).map((_, i) => {
                        const dayOfMonth = (i % 31) + 1;
                        const hasEvent = [3, 8, 12, 15, 22, 27].includes(dayOfMonth);
                        return (
                          <div
                            key={i}
                            className={`border rounded-md p-2 min-h-[80px] ${
                              hasEvent ? 'bg-blue-50 dark:bg-blue-950' : ''
                            } ${i < 7 ? 'border-t-2 border-t-blue-500' : ''}`}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium">{dayOfMonth}</span>
                            </div>
                            {hasEvent && (
                              <div className="mt-1 p-1 text-xs bg-blue-100 dark:bg-blue-900 rounded">
                                {dayOfMonth === 8 ? "Team Meeting" : 
                                 dayOfMonth === 15 ? "Sprint Review" :
                                 dayOfMonth === 27 ? "Project Deadline" :
                                 "Client Call"}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeTab === 'messages' && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <h2 className="text-xl font-bold">Team Chat</h2>
                </div>
                <Card className="flex flex-col h-[600px]">
                  <CardContent className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-4">
                      {messages.map((message) => {
                        const sender = teamMembers.find(m => m.id === message.sender);
                        return (
                          <div key={message.id} className="flex items-start gap-2">
                            {sender && (
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={sender.avatar} />
                                <AvatarFallback>{sender.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            )}
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-sm">{sender?.name}</p>
                                <span className="text-xs text-slate-500 dark:text-slate-400">{message.timestamp}</span>
                              </div>
                              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3 mt-1">
                                {message.content}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      {/* AI Assistant Message */}
                      <div className="flex items-start gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-purple-500 text-white">AI</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm">AI Assistant</p>
                            <span className="text-xs text-slate-500 dark:text-slate-400">Now</span>
                          </div>
                          <div className="bg-purple-50 dark:bg-purple-900 border border-purple-100 dark:border-purple-800 rounded-lg p-3 mt-1">
                            Would you like me to help schedule your next team meeting or create tasks based on the upcoming deadlines?
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-end gap-2">
                      <div className="flex-1">
                        <textarea
                          className="w-full rounded-md border border-slate-200 dark:border-slate-700 p-3 min-h-[80px] resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Type your message here..."
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                        ></textarea>
                      </div>
                      <Button onClick={handleSendMessage}>Send</Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
          
          {/* Footer Status */}
          <div className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-4 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 dark:text-slate-400">Current Sprint:</span>
                <Badge variant="outline">Sprint 12</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 dark:text-slate-400">Status:</span>
                <Badge>In Progress</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 dark:text-slate-400">Team Activity:</span>
                <Badge variant="outline" className="bg-green-100 text-green-800">High</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 dark:text-slate-400">Next Meeting:</span>
                <Badge variant="outline">Apr 30, 2025</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Task Detail Dialog */}
      <Dialog open={!!selectedTaskId} onOpenChange={(open) => !open && setSelectedTaskId(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {tasks.find(t => t.id === selectedTaskId)?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedTaskId && (
              <>
                <div>
                  <h4 className="text-sm font-medium mb-1">Description</h4>
                  <p className="text-sm">{tasks.find(t => t.id === selectedTaskId)?.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Status</h4>
                    <Badge variant="outline" className={getStatusColor(tasks.find(t => t.id === selectedTaskId)?.status || "Not Started")}>
                      {tasks.find(t => t.id === selectedTaskId)?.status}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Priority</h4>
                    <Badge variant="outline" className={getPriorityColor(tasks.find(t => t.id === selectedTaskId)?.priority || "Low")}>
                      {tasks.find(t => t.id === selectedTaskId)?.priority}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Due Date</h4>
                    <p className="text-sm">{new Date(tasks.find(t => t.id === selectedTaskId)?.dueDate || "").toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Assignee</h4>
                    {(() => {
                      const task = tasks.find(t => t.id === selectedTaskId);
                      const assignee = teamMembers.find(m => m.id === task?.assignee);
                      return (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={assignee?.avatar} />
                            <AvatarFallback>{assignee?.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{assignee?.name}</span>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
