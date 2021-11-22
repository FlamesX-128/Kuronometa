import { timersList } from "../variables.js";


await (async () => {
  const container = document.getElementById("timersButtons");

  const timersPicture = [
    "fa-clock",
    "fa-bread-slice",
    "fa-coffee"
  ];

  const timersName = [
    "Work",
    "Long Break",
    "Break"
  ]


  timersList.forEach((type, i) => {
    container.innerHTML += `
      <div>
        <button id="${type}Time">
          <i class="fas ${timersPicture[i]} fa-2x"></i>
          <p>${timersName[i]}</p>
        </button>
      </div>
    `;
  });


})();


export {};