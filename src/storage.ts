import { existsSync, readFileSync, writeFileSync } from "fs";

import { storagePath } from "./vars";

class Storage {
  constructor() {
    if (!existsSync(storagePath)) this.createFile();
  }

  private createFile() {
    writeFileSync(storagePath, JSON.stringify({
      Tasks: [],
      Timers: {
        working: 30,
        longBreak: 20,
        break: 10
      }
    }));
  }

  public get(collection: Collection): Task[] | Timers {
    return JSON.parse(this.readStorage())[collection];
  }

  private readStorage(): string {
    return readFileSync(storagePath, { encoding: "utf8" });
  }

  public reset(): void {
    this.createFile();
  }

  public addTask(title: string): void {
    let data: { Tasks: TaskWithId[], Timers: Timers } = JSON.parse(this.readStorage());
    data["Tasks"].push({
      _id: (data.Tasks.length + 1),
      title,
    });

    writeFileSync(storagePath, JSON.stringify(data));
  }

  public deleteTask(id: number): void {
    let data: { Tasks: TaskWithId[], Timers: Timers } = JSON.parse(this.readStorage());
    data["Tasks"] = data["Tasks"].filter((task: TaskWithId) => task._id !== id);

    writeFileSync(storagePath, JSON.stringify(data));
  }

  public setTimers(timers: Timers): void {
    let data: { Tasks: Task[], Timers: Timers } = JSON.parse(this.readStorage());
    data["Timers"] = timers;

    writeFileSync(storagePath, JSON.stringify(data));
  }
}


export default new Storage();