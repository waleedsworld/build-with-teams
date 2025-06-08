
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/navigation"
import { Calendar as CalendarIcon, Plus, Users } from "lucide-react"
import { format } from "date-fns"

type Event = {
  id: number
  title: string
  date: Date
  type: "meeting" | "task" | "deadline"
  participants: string[]
  description?: string
}

type TeamMember = {
  id: number
  name: string
  avatar?: string
  availability: "available" | "busy" | "away"
}

const events: Event[] = [
  {
    id: 1,
    title: "Team Meeting",
    date: new Date(2025, 3, 26, 14, 0),
    type: "meeting",
    participants: ["John Doe", "Sarah Smith", "Mike Johnson"]
  },
  {
    id: 2,
    title: "Design Review",
    date: new Date(2025, 3, 27, 10, 0),
    type: "meeting",
    participants: ["John Doe", "Sarah Smith"]
  },
  {
    id: 3,
    title: "Complete UI Components",
    date: new Date(2025, 3, 28),
    type: "task",
    participants: ["John Doe"]
  },
  {
    id: 4,
    title: "Project Deadline",
    date: new Date(2025, 4, 1),
    type: "deadline",
    participants: ["Team"]
  }
]

const teamMembers: TeamMember[] = [
  { id: 1, name: "John Doe", availability: "available" },
  { id: 2, name: "Sarah Smith", availability: "busy" },
  { id: 3, name: "Mike Johnson", availability: "away" },
  { id: 4, name: "Alex Wong", availability: "available" },
]

const availabilityColors = {
  "available": "bg-green-500",
  "busy": "bg-red-500",
  "away": "bg-yellow-500"
}

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [newEventTitle, setNewEventTitle] = useState("")
  const [newEventType, setNewEventType] = useState("meeting")
  const [newEventDescription, setNewEventDescription] = useState("")
  
  const todayEvents = events.filter(event => 
    date && 
    event.date.getDate() === date.getDate() &&
    event.date.getMonth() === date.getMonth() &&
    event.date.getFullYear() === date.getFullYear()
  )

  return (
    <div>
      <Navigation />
      <div className="container mx-auto pt-20 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Team Calendar</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">Title</Label>
                  <Input 
                    id="title" 
                    value={newEventTitle} 
                    onChange={(e) => setNewEventTitle(e.target.value)} 
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">Date</Label>
                  <div className="col-span-3">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="pointer-events-auto border rounded-md"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">Type</Label>
                  <Select value={newEventType} onValueChange={setNewEventType}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="task">Task</SelectItem>
                      <SelectItem value="deadline">Deadline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">Description</Label>
                  <Textarea 
                    id="description"
                    value={newEventDescription}
                    onChange={(e) => setNewEventDescription(e.target.value)}
                    className="col-span-3" 
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => console.log("Event saved")}>Save Event</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 p-6">
            <Tabs defaultValue="calendar">
              <TabsList className="mb-6">
                <TabsTrigger value="calendar">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Calendar
                </TabsTrigger>
                <TabsTrigger value="team">
                  <Users className="mr-2 h-4 w-4" />
                  Team Availability
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="calendar" className="space-y-4">
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="pointer-events-auto border rounded-md"
                  />
                </div>
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">
                    {date ? format(date, "MMMM d, yyyy") : "Select a date"}
                  </h2>
                  {todayEvents.length > 0 ? (
                    <ScrollArea className="h-[200px]">
                      <div className="space-y-4">
                        {todayEvents.map((event) => (
                          <div key={event.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{event.title}</h3>
                                <Badge variant={event.type === "meeting" ? "default" : 
                                        event.type === "task" ? "secondary" : "destructive"}>
                                  {event.type}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {event.date.getHours() ? format(event.date, "h:mm a") : "All day"}
                              </p>
                            </div>
                            <div className="flex -space-x-2">
                              {event.participants.map((participant, i) => (
                                <Avatar key={i} className="h-6 w-6 border-2 border-background">
                                  <AvatarFallback>{participant[0]}</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      No events scheduled for this day
                    </p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="team">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Team Availability</h2>
                  <div className="space-y-4">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name[0]}</AvatarFallback>
                          </Avatar>
                          <span>{member.name}</span>
                        </div>
                        <Badge className={availabilityColors[member.availability]}>
                          {member.availability}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
          
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
            <ScrollArea className="h-[500px]">
              <div className="space-y-4">
                {events
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map((event) => (
                    <div key={event.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{event.title}</h3>
                        <Badge variant={event.type === "meeting" ? "default" : 
                                event.type === "task" ? "secondary" : "destructive"}>
                          {event.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {format(event.date, "MMMM d, yyyy")}
                        {event.date.getHours() ? ` at ${format(event.date, "h:mm a")}` : ""}
                      </p>
                      <div className="flex mt-2 items-center">
                        <span className="text-xs text-muted-foreground mr-2">Participants:</span>
                        <div className="flex -space-x-2">
                          {event.participants.map((participant, i) => (
                            <Avatar key={i} className="h-5 w-5 border-2 border-background">
                              <AvatarFallback>{participant[0]}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
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
