window.addEventListener("DOMContentLoaded", (event) => {
  getDueDate();
});

function getDueDate() {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const totalDays = 40 * 7;
  const today = new Date();
  // const dueDate = new Date(2021, 0, 18); // first month/day = zero
  const dueDate = new Date("2021-01-19T00:00:00");
  const remainingSeconds = Math.abs(dueDate - today);
  const remainingDays = Math.round(remainingSeconds / oneDay);
  const percentRemaining = Math.round((remainingDays / totalDays) * 100);
  const percentComplete = 100 - percentRemaining;
  console.log(remainingDays);
  console.log(remainingDays / totalDays);
  console.log(percentComplete);
  console.log(percentRemaining);

  let progress = document.getElementById("progress");
  progress.setAttribute(
    "stroke-dasharray",
    `${percentComplete} ${percentRemaining}`
  );
  let percentText = document.getElementById("percent-text");
  percentText.innerHTML = `${percentComplete}%`;

  document.getElementById("progress").animate(
    [
      // keyframes
      { "stroke-dasharray": "0 100" },
      { "stroke-dasharray": `${percentComplete} ${percentRemaining}` },
    ],
    {
      // timing options
      duration: 1000,
      iterations: Infinity,
    }
  );

  // keyframes.insertRule("0% {
  //   stroke-dasharray: 0, 100;
  // }");

  // keyframes.insertRule("100% {
  //   -webkit-transform: translate(100px, 100px) rotate(" + (multiplier + 0) + "deg)
  //                      translate(-100px, -100px) rotate(" + (multiplier + 0) + "deg);
  //   background-color:red;
  // }");
  // 0% {
  //   stroke-dasharray: 0, 100;
  // }
  // 100% {
  //   stroke-dasharray: 69, 31;
  // }

  // progress.setAttribute("stroke-dashoffset", 0);
  // progress.setAttribute("stroke-dasharray", progress, 100 - progress);
  // progress.strokeWidth(30);
  // stroke-dasharray="69 31"
}
