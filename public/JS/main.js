import { Kuronometa } from "./models/kuronometa.js";
import { timersList } from "./variables.js";


const ipcRenderer = require("electron").ipcRenderer;


export const kuronometa = new Kuronometa(await ipcRenderer.invoke('storage-get', 'Timers'));


await (async () => {
  // Create countdown change buttons.
  await import("./helpers/timer.js");

  // Start countdown change listeners.
  for (const timer of timersList)
    document.getElementById((timer + "Time")).addEventListener('click',
      () => kuronometa.changeCurrentCountdown(timer)
    );


  // Stop or start countdown.
  const changeState = document.getElementById('changeState');

  // Start countdown change button listeners.
  changeState.addEventListener('click', () => {
    kuronometa.changeState();

    changeState.innerText = kuronometa.activated
      ? 'Stop'
      : 'Start';
  });


  // Create the form inputs.
  await import("./helpers/formInputs.js");

  // Initiate input values.
  const initialiteInputs = async () => {
    for (const timer of timersList)
      document.getElementById((timer + "Time" + "Input")).value = await (await ipcRenderer.invoke('storage-get', 'Timers'))[timer];
  }

  await initialiteInputs();


  const settingsWindow = document.getElementById('settingsWindow');
  const popup = document.getElementById('popup');

  const closeSettings = () => {
    popup.style.animation = 'closePopWindow 0.3s forwards'

    setTimeout(() => {
      settingsWindow.style.animation = 'closeSettingsWindow 0.3s forwards';

      setTimeout(() => settingsWindow.style.visibility = 'hidden', 300)
    }, 300);
  };

  const openSettings = () => {
    settingsWindow.style.visibility = 'visible';
    settingsWindow.style.animation = 'openSettingsWindow 0.3s forwards';

    setTimeout(() => 
      popup.style.animation = 'openPopWindow 0.3s forwards'
    , 300);
  };

  document.getElementById('applyChanges').addEventListener('click', () => {
    const timers = ((toReturn) => {
      for (const id of timersList)
        toReturn[id] = document.getElementById((id + "Time" + "Input")).value;

      return toReturn;
    })({});

    closeSettings();
    ipcRenderer.send('storage-setTimers', timers);
    kuronometa.setIntervalTimes(timers);
  });

  document.getElementById('cancelChanges').addEventListener('click', async () => {
    closeSettings();

    await initialiteInputs();
  })

  
  document.getElementById('openSettingsWindow').addEventListener('click', () => {
    openSettings();
  });

  await import("./helpers/Tasks.js");
})();