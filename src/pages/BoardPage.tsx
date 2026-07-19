import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Plus, Search, Trash2, GripVertical, RotateCcw } from "lucide-react";

/**
 * BoardPage — a fully interactive Kanban board for the TaaS product surface.
 *
 * Everything here is real and stateful: tasks can be created, moved between
 * columns via native drag-and-drop, filtered, and deleted. The whole board is
 * persisted to localStorage so a demo survives reloads without a backend.
 */

type Priority = "low" | "medium" | "high";
type ColumnId = "backlog" | "todo" | "in-progress" | "done";

interface Task {
  id: string;
  title: string;
  description?: string;
  assignee: string;
  priority: Priority;
  tag: string;
  column: ColumnId;
}

const COLUMNS: { id: ColumnId; title: string; accent: string }[] = [
  { id: "backlog", title: "Backlog", accent: "bg-slate-400" },
  { id: "todo", title: "To Do", accent: "bg-blue-500" },
  { id: "in-progress", title: "In Progress", accent: "bg-amber-500" },
  { id: "done", title: "Done", accent: "bg-emerald-500" },
];

const PRIORITY_STYLES: Record<Priority, string> = {
  low: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  medium: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  high: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
};

const STORAGE_KEY = "taas-kanban-board-v1";

const SEED_TASKS: Task[] = [
  { id: "t1", title: "Design system tokens", description: "Define color, spacing, and typography scales for the shared library.", assignee: "John Doe", priority: "high", tag: "Design", column: "in-progress" },
  { id: "t2", title: "Onboarding flow copy", description: "Write the three welcome screens for new workspace members.", assignee: "Sarah Smith", priority: "medium", tag: "Content", column: "todo" },
  { id: "t3", title: "Auth edge function", description: "Wire Supabase magic-link login for the beta cohort.", assignee: "Mike Johnson", priority: "high", tag: "Backend", column: "todo" },
  { id: "t4", title: "Pricing page A/B test", description: "Ship two variants of the pricing hero and split traffic.", assignee: "Ava Chen", priority: "low", tag: "Growth", column: "backlog" },
  { id: "t5", title: "Calendar drag-resize", description: "Let users resize events by dragging the bottom edge.", assignee: "John Doe", priority: "medium", tag: "Frontend", column: "backlog" },
  { id: "t6", title: "Landing hero animation", description: "Add the subtle parallax reveal on scroll.", assignee: "Ava Chen", priority: "low", tag: "Frontend", column: "done" },
  { id: "t7", title: "Weekly team digest email", description: "Summarize shipped work and send every Friday.", assignee: "Sarah Smith", priority: "medium", tag: "Growth", column: "done" },
];

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED_TASKS;
    const parsed = JSON.parse(raw) as Task[];
    if (!Array.isArray(parsed) || parsed.length === 0) return SEED_TASKS;
    return parsed;
  } catch {
    return SEED_TASKS;
  }
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const emptyDraft = { title: "", description: "", assignee: "", priority: "medium" as Priority, tag: "General" };

export default function BoardPage() {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [query, setQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "all">("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [draft, setDraft] = useState(emptyDraft);
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<ColumnId | null>(null);
  const dragIdRef = useRef<string | null>(null);

  // Persist on every change so a demo survives reloads.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      /* storage may be unavailable (private mode) — the board still works in-memory */
    }
  }, [tasks]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks.filter((t) => {
      const matchesQuery =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.assignee.toLowerCase().includes(q) ||
        t.tag.toLowerCase().includes(q);
      const matchesPriority = priorityFilter === "all" || t.priority === priorityFilter;
      return matchesQuery && matchesPriority;
    });
  }, [tasks, query, priorityFilter]);

  const byColumn = useCallback(
    (col: ColumnId) => filtered.filter((t) => t.column === col),
    [filtered]
  );

  const moveTask = useCallback((id: string, column: ColumnId) => {
    setTasks((prev) => {
      const task = prev.find((t) => t.id === id);
      if (!task || task.column === column) return prev;
      return prev.map((t) => (t.id === id ? { ...t, column } : t));
    });
  }, []);

  const handleDrop = (column: ColumnId) => {
    const id = dragIdRef.current;
    setDragOverCol(null);
    setDragId(null);
    dragIdRef.current = null;
    if (id) moveTask(id, column);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    toast({ title: "Task deleted" });
  };

  const addTask = () => {
    if (!draft.title.trim()) {
      toast({ title: "A title is required", variant: "destructive" });
      return;
    }
    const task: Task = {
      id: `t-${Date.now()}`,
      title: draft.title.trim(),
      description: draft.description.trim() || undefined,
      assignee: draft.assignee.trim() || "Unassigned",
      priority: draft.priority,
      tag: draft.tag.trim() || "General",
      column: "todo",
    };
    setTasks((prev) => [task, ...prev]);
    setDraft(emptyDraft);
    setDialogOpen(false);
    toast({ title: "Task added to To Do" });
  };

  const resetBoard = () => {
    setTasks(SEED_TASKS);
    toast({ title: "Board reset to sample data" });
  };

  const doneCount = tasks.filter((t) => t.column === "done").length;
  const progress = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-20 pb-10">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Team Board</h1>
            <p className="mt-1 text-muted-foreground">
              Plan and move work across your on-demand team. Drag cards between columns —
              changes save automatically.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={resetBoard} className="gap-1.5">
              <RotateCcw className="h-4 w-4" /> Reset
            </Button>
            <Button size="sm" onClick={() => setDialogOpen(true)} className="gap-1.5">
              <Plus className="h-4 w-4" /> New task
            </Button>
          </div>
        </div>

        {/* Progress + controls */}
        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-2 w-40 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm text-muted-foreground">
              {doneCount} of {tasks.length} done ({progress}%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tasks…"
                className="w-48 pl-8"
              />
            </div>
            <Select
              value={priorityFilter}
              onValueChange={(v) => setPriorityFilter(v as Priority | "all")}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Board */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COLUMNS.map((col) => {
            const colTasks = byColumn(col.id);
            const isOver = dragOverCol === col.id;
            return (
              <div
                key={col.id}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (dragOverCol !== col.id) setDragOverCol(col.id);
                }}
                onDragLeave={(e) => {
                  // Only clear when leaving the column entirely.
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    setDragOverCol((c) => (c === col.id ? null : c));
                  }
                }}
                onDrop={() => handleDrop(col.id)}
                className={cn(
                  "flex flex-col rounded-xl border bg-muted/30 p-3 transition-colors",
                  isOver && "border-foreground/30 bg-muted/70 ring-2 ring-foreground/10"
                )}
                data-testid={`column-${col.id}`}
              >
                <div className="mb-3 flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className={cn("h-2 w-2 rounded-full", col.accent)} />
                    <h2 className="text-sm font-semibold">{col.title}</h2>
                  </div>
                  <span className="rounded-full bg-background px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    {colTasks.length}
                  </span>
                </div>

                <div className="flex min-h-[120px] flex-1 flex-col gap-2">
                  {colTasks.map((task) => (
                    <article
                      key={task.id}
                      draggable
                      onDragStart={() => {
                        setDragId(task.id);
                        dragIdRef.current = task.id;
                      }}
                      onDragEnd={() => {
                        setDragId(null);
                        dragIdRef.current = null;
                        setDragOverCol(null);
                      }}
                      className={cn(
                        "group cursor-grab rounded-lg border bg-card p-3 shadow-sm transition-all hover:shadow-md active:cursor-grabbing",
                        dragId === task.id && "opacity-40"
                      )}
                      data-testid="task-card"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-1.5">
                          <GripVertical className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/50" />
                          <h3 className="text-sm font-medium leading-snug">{task.title}</h3>
                        </div>
                        <button
                          aria-label="Delete task"
                          onClick={() => deleteTask(task.id)}
                          className="opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      {task.description && (
                        <p className="mt-1.5 line-clamp-2 pl-5 text-xs text-muted-foreground">
                          {task.description}
                        </p>
                      )}
                      <div className="mt-3 flex items-center justify-between pl-5">
                        <div className="flex items-center gap-1.5">
                          <Badge
                            variant="secondary"
                            className={cn("border-0 text-[10px] font-medium", PRIORITY_STYLES[task.priority])}
                          >
                            {task.priority}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground">{task.tag}</span>
                        </div>
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-[10px]">{initials(task.assignee)}</AvatarFallback>
                        </Avatar>
                      </div>
                    </article>
                  ))}

                  {colTasks.length === 0 && (
                    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed text-xs text-muted-foreground">
                      Drop tasks here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* New task dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New task</DialogTitle>
            <DialogDescription>Add a card to the To Do column.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={draft.title}
                onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                placeholder="What needs doing?"
                autoFocus
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="desc">Description</Label>
              <Textarea
                id="desc"
                value={draft.description}
                onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
                placeholder="Optional details…"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="assignee">Assignee</Label>
                <Input
                  id="assignee"
                  value={draft.assignee}
                  onChange={(e) => setDraft((d) => ({ ...d, assignee: e.target.value }))}
                  placeholder="Name"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="tag">Tag</Label>
                <Input
                  id="tag"
                  value={draft.tag}
                  onChange={(e) => setDraft((d) => ({ ...d, tag: e.target.value }))}
                  placeholder="Design"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Priority</Label>
                <Select
                  value={draft.priority}
                  onValueChange={(v) => setDraft((d) => ({ ...d, priority: v as Priority }))}
                >
                  <SelectTrigger>
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
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addTask}>Add task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
