document.addEventListener("DOMContentLoaded", function () {
  const sceneEl = document.querySelector("a-scene");
  const arSystem = sceneEl.systems["mindar-image-system"];
  const aEntity = document.querySelectorAll("#a_entity");
  const aPlane = document.querySelectorAll("#a_plane");
  const startButton = document.querySelector("#example-start-button");
  const stopButton = document.querySelector("#example-stop-button");
  const pauseButton = document.querySelector("#example-pause-button");
  const pauseKeepVideoButton = document.querySelector(
    "#example-pause-keep-video-button"
  );
  const unpauseButton = document.querySelector("#example-unpause-button");

  startButton.addEventListener("click", () => {
    console.log("start");
    arSystem.start(); // start AR
  });
  stopButton.addEventListener("click", () => {
    arSystem.stop(); // stop AR
  });
  pauseButton.addEventListener("click", () => {
    arSystem.pause(); // pause AR, keep video feed
  });
  pauseKeepVideoButton.addEventListener("click", () => {
    arSystem.pause(true); // pause AR and video
  });
  unpauseButton.addEventListener("click", () => {
    arSystem.unpause(); // unpause AR and video
  });
  // arReady event triggered when ready
  sceneEl.addEventListener("arReady", (event) => {
    // console.log("MindAR is ready")
  });
  // arError event triggered when something went wrong. Mostly browser compatbility issue
  sceneEl.addEventListener("arError", (event) => {
    // console.log("MindAR failed to start")
  });
  // detect target found
  aEntity.forEach((item) => {
    item.addEventListener("targetFound", (event) => {
      console.log("target found");
    });
  });
  // detect target lost
  aEntity.forEach((item) => {
    item.addEventListener("targetLost", (event) => {
      console.log("target lost");
    });
  });
  // detect click event
  aPlane.forEach((item) => {
    item.addEventListener("click", (event) => {
      console.log("plane click");
    });
  });
});
