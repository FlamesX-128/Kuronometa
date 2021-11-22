interface Task {
  title: string
}

interface TaskWithId extends Task {
  _id: number,
}

interface Timers {
  working: number,
  longBreak: number,
  break: number
}

type Collection = "Timers" | "Tasks";
