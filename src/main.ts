import { app } from "electron";

(async (): Promise<void> => {
  await app.whenReady();

  await import("./windows/main");
  await import("./events/app");
})();

export {};
