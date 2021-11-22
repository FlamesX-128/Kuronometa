import { join } from "path";

import { BrowserWindow } from "electron";

import { publicDir } from "../vars";

(async (): Promise<void> => {
  const window = new BrowserWindow({
    height: 550,
    minHeight: 280,
    minWidth: 280,
    maxHeight: 550,
    maxWidth: 280,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      preload: join(publicDir, "JS", "preload.js"),
      devTools: false
    },
    width: 280,
    fullscreen: false,
    simpleFullscreen: false,
    maximizable: false,
    resizable: false,
    roundedCorners: true,
    skipTaskbar: true,
  });

  window.menuBarVisible = false;

  window.loadFile(join(publicDir, "main.html"));

  await import("../events/ipcMain");
})();

export {};
