export class Kuronometa {
  activated = false;

  breakTime = 10;
  longBreakTime = 20;
  workingTime = 30;

  currentCountdown = 0;
  time = 0;

  constructor(timers) {
    this.setIntervalTimes(timers);

    this.start();
  }

  setIntervalTimes(timers) {
    console.log(timers);
    this.workingTime = timers.working * 60;
    this.longBreakTime = timers.longBreak * 60;
    this.breakTime = timers.break * 60;

    this.currentCountdown = this.workingTime;
    this.reset();
  }

  changeState() {
    this.activated = !this.activated;
  }

  changeCurrentCountdown(timer) {
    if (this.currentCountdown === this[(timer + "Time")]) return;

    this.currentCountdown = this[(timer + "Time")];
    this.reset();
  }

  reset() {
    document.getElementById("countdown").innerHTML = (this.currentCountdown / 60) + ":00";
    document.getElementById('changeState').innerText = 'Start';

    this.activated = false;
    this.time = this.currentCountdown;
  }

  start() {
    let seconds, minutes;

    setInterval(() => {
      if (this.activated) this.time--;
      if (this.time === 0) this.reset();

      minutes = parseInt(String(this.time / 60), 10);
      seconds = parseInt(String(this.time % 60), 10);

      minutes = minutes < 10
        ? "0" + minutes
        : minutes;

      seconds = seconds < 10
        ? "0" + seconds
        : seconds;

      document.getElementById("countdown").innerHTML = minutes + ":" + seconds;
    }, 1000);
  }
}