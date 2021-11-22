import { app, BrowserWindow } from "electron";

(async (): Promise<void> => {
  app.on("activate", async (): Promise<void> => {
    if (BrowserWindow.getAllWindows().length === 0)
      await import("../windows/main");
  });

  app.on("window-all-closed", (): void => {
    if (process.platform !== "darwin") app.quit();
  });
})();

export {};
