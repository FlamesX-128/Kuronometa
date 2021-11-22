import { ipcMain } from "electron";

import storage from "../storage";

(async (): Promise<void> => {
  ipcMain.handle("storage-get",
    (_, collection: Collection): Task[] | Timers => storage.get(collection)
  );

  // Restart Storage
  ipcMain.on("storage-reset",
    (): void => storage.reset()
  );

  // Tasks
  ipcMain.handle("storage-addTask",
    (_, task: string): void => storage.addTask(task) 
  );

  ipcMain.handle("storage-deleteTask",
    (_, id: number): void => storage.deleteTask(id)
  );

  // Timers
  ipcMain.on("storage-setTimers",
    (_, timers: Timers): void => storage.setTimers(timers)
  );
})();

export {};
