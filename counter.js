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

function animateProgress(progressSegment, percentComplete) {
  progressSegment.animate(
    [
      { strokeDasharray: "0 100" },
      {
        strokeDasharray: "80 20",
      },
    ],
    {
      duration: 2000,
      iterations: 1,
      easing: "ease-in-out",
    }
  );
}

function updateProgress(percentRemaining) {
  const percentComplete = 100 - percentRemaining;
  let progressSegment = document.getElementById("progress");
  progressSegment.setAttribute(
    "stroke-dasharray",
    `${percentComplete} ${percentRemaining}`
  );
  let percentText = document.getElementById("percent-text");
  percentText.innerHTML = `${percentComplete}%`;
  animateProgress(progressSegment, percentComplete);
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

  const percentRemaining = Math.round((remainingDays / totalDays) * 100);
  updateProgress(percentRemaining);
}
