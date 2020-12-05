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
function animateProgressHand(progressHand, percentDegrees) {
  progressHand.animate(
    [
      { transform: "rotate(0deg)" },
      {
        transform: `rotate(${percentDegrees}deg)`,
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
  let progressHand = document.getElementById("progress-hand");
  let percentDegrees = (percentComplete / 100) * 360;

  progressHand.style.transform = `rotate(${percentDegrees}deg)`;
  animateProgressHand(progressHand, percentDegrees);

  progressSegment.setAttribute(
    "stroke-dasharray",
    `${percentComplete} ${percentRemaining(percentComplete)}`
  );
  animateProgress(progressSegment, percentComplete);
}

function updatePercent(percentCompleteTerm) {
  let percentText = document.getElementById("percent-text");
  percentText.innerHTML = `${percentCompleteTerm}%`;
}

function updateWeeks(weeks) {
  let weeksLabel = document.getElementById("weeks");
  weeksLabel.innerHTML = `${weeks} weeks`;
}

function updateSummary(days) {
  let remainingSummary = document.getElementById("summary");
  const remainingWeeks = Math.floor(days / 7);
  const daysRemainder = Math.round(days % 7);
  summary = `due ${remainingWeeks} weeks`;
  if (daysRemainder) {
    summary += ` and ${daysRemainder} days`;
  }
  remainingSummary.innerHTML = summary;
}

function getDueDate() {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const totalDays = 40 * 7;
  const earlyTermDays = 37 * 7;
  const totalMilliseconds = totalDays * oneDay;

  const today = new Date();
  const dueDate = new Date("2021-01-19T00:00:00");
  const conceptionDate = new Date(dueDate - totalMilliseconds);

  const elapsedDays = daysBetweenDates(conceptionDate, today);
  const remainingDays = daysBetweenDates(today, dueDate);
  const percentComplete = Math.round((elapsedDays / totalDays) * 100);
  const percentCompleteTerm = Math.round((elapsedDays / earlyTermDays) * 100);

  updateProgress(percentComplete);
  updatePercent(percentCompleteTerm);
  updateWeeks(daysToWeeks(elapsedDays));
  updateSummary(remainingDays);
}
