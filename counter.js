window.addEventListener("DOMContentLoaded", (event) => {
  getDueDate();
});

function _debug(v) {
  document.getElementById("debugger").innerHTML = `<h2>${v}</h2>`;
  return false;
}

function daysBetweenDates(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  return Math.abs((date2 - date1) / oneDay);
}

function daysToWeeks(days) {
  return Math.floor(days / 7);
}

function percentRemaining(percentComplete) {
  return 100 - percentComplete;
}

function animateProgress(progressSegment, percentComplete) {
  const percentRemain = percentRemaining(percentComplete);
  progressSegment.animate(
    [
      { strokeDasharray: "0 100" },
      {
        strokeDasharray: `${percentComplete} ${percentRemain}`,
      },
    ],
    {
      duration: 2000,
      iterations: 1,
      easing: "ease-in-out",
    }
  );
}

function updateProgress(percentComplete) {
  let progressSegment = document.getElementById("progress");
  progressSegment.setAttribute(
    "stroke-dasharray",
    `${percentComplete} ${percentRemaining(percentComplete)}`
  );
  let percentText = document.getElementById("percent-text");
  percentText.innerHTML = `${percentComplete}%`;
  animateProgress(progressSegment, percentComplete);
}

function updateWeeks(weeks) {
  let weeksLabel = document.getElementById("weeks");
  weeksLabel.innerHTML = `${weeks} weeks`;
}

function getDueDate() {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const totalDays = 40 * 7;
  const totalMilliseconds = totalDays * oneDay;

  const today = new Date("2020-11-23T00:00:00");
  const dueDate = new Date("2021-01-19T00:00:00");
  const conceptionDate = new Date(dueDate - totalMilliseconds);

  const elapsedDays = daysBetweenDates(conceptionDate, today);
  const remainingDays = daysBetweenDates(today, dueDate);
  const percentComplete = Math.round((elapsedDays / totalDays) * 100);

  updateProgress(percentComplete);
  updateWeeks(daysToWeeks(elapsedDays));
}
