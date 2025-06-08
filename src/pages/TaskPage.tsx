
import { useState } from "react"
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
import { MessageSquare } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Navigation } from "@/components/navigation"

type Comment = {
  id: number
  author: string
  content: string
  timestamp: string
}

const comments: Comment[] = [
  { id: 1, author: "John Doe", content: "Started working on the design system", timestamp: "2 hours ago" },
  { id: 2, author: "Sarah Smith", content: "Added new components", timestamp: "1 hour ago" },
  { id: 3, author: "Mike Johnson", content: "Updated documentation", timestamp: "30 minutes ago" },
]

export default function TaskPage() {
  const [status, setStatus] = useState<string>("in-progress")
  const [priority, setPriority] = useState<string>("medium")

  return (
    <div>
      <Navigation />
      <div className="container mx-auto pt-20 p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Task Details Section */}
          <Card className="col-span-2 p-6">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">Design System Implementation</h1>
                <p className="text-muted-foreground mt-2">
                  Create and implement a comprehensive design system for the application
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Assigned to</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg" alt="John Doe" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">John Doe</span>
                  </div>
                </div>

                <Separator orientation="vertical" className="h-8" />

                <div>
                  <p className="text-sm text-muted-foreground">Due Date</p>
                  <p className="text-sm font-medium mt-1">May 1, 2025</p>
                </div>

                <Separator orientation="vertical" className="h-8" />

                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="w-[140px] mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator orientation="vertical" className="h-8" />

                <div>
                  <p className="text-sm text-muted-foreground">Priority</p>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger className="w-[140px] mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>

          {/* Activity Log Section */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Activity Log</h2>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt={comment.author} />
                      <AvatarFallback>{comment.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{comment.author}</p>
                        <span className="text-xs text-muted-foreground">
                          {comment.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  )
}
