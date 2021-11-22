import { timersList } from "../variables.js";

await (async ()=> {
  const settingsForm = document.getElementById("settingsForm");

  for (const id of timersList) settingsForm.innerHTML += `
    <div class="formInput">
      <label for="${id}TimeInput">${id}</label>
      <input type="number" id="${id}TimeInput" name="${id}TimeInput" min="1" max="999" value="0" />
    </div>
  `;

  settingsForm.innerHTML += `
    <div id="changes">
      <input id="applyChanges" type="button" value="Apply" />
      <input id="cancelChanges" type="button" value="Cancel" />
    </div>
  `;

})();

export {};
