
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Square, MessageSquare } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Navigation } from "@/components/navigation"

type Task = {
  id: number
  title: string
  status: "todo" | "in-progress" | "completed"
  dueDate: string
}

const tasks: Task[] = [
  { id: 1, title: "Design System Implementation", status: "in-progress", dueDate: "2025-05-01" },
  { id: 2, title: "User Research", status: "todo", dueDate: "2025-05-03" },
  { id: 3, title: "UI Components", status: "completed", dueDate: "2025-04-24" },
]

const statusColorMap = {
  "todo": "bg-yellow-500",
  "in-progress": "bg-blue-500",
  "completed": "bg-green-500"
}

export default function PersonPage() {
  return (
    <div>
      <Navigation />
      <div className="container mx-auto pt-20 p-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg" alt="John Doe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold">John Doe</h1>
                <p className="text-muted-foreground">Senior UI/UX Designer</p>
              </div>
            </div>
            <Button className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Send Message
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Task List Section */}
          <Card className="col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Square className="h-5 w-5" />
                Assigned Tasks
              </h2>
              <Button>Assign New Task</Button>
            </div>
            
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="space-y-1">
                      <h3 className="font-medium">{task.title}</h3>
                      <p className="text-sm text-muted-foreground">Due: {task.dueDate}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Select defaultValue={task.status}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todo">To Do</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                      <Badge className={statusColorMap[task.status]}>
                        {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>

          {/* Stats & Notes Section */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Task Status</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <p className="font-semibold">2</p>
                    <p className="text-xs text-muted-foreground">To Do</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <p className="font-semibold">3</p>
                    <p className="text-xs text-muted-foreground">In Progress</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <p className="font-semibold">5</p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Recent Notes</h3>
                <div className="space-y-2">
                  <p className="text-sm">Updated UI components documentation</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
