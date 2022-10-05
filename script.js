var apiUrl = "https://633bea5bf11701a65f6aa1a8.mockapi.io/api/image_ar";
var app = document.querySelector("#scene_camera");

const exampleTarget = document.querySelectorAll("#example-target");
const examplePlane = document.querySelectorAll("#example-plane");

// examplePlane.forEach((plane) => {
//   plane.onclick = () => {
//     exampleTarget.forEach((target) => {
//       target.setAttribute(
//         "animation",
//         "property: rotation; to: 0 360 0; loop: true; dur: 10000"
//       );
//     });
//     console.log(exampleTarget);
//   };
// });

function fetchApi() {
  axios
    .get(apiUrl)
    .then((res) => {
      console.log(res.data);
      // app.innerHTML =
      //   "<a-assets>" +
      //   res.data
      //     .map(function (item) {
      //       return "<a-assets>
      // <img src="" id="" />
      // <a-asset-item src="" id=""></a-asset-item>
      // </a-assets>";
      //     })
      //     .join("") +
      //   "</a-assets>" + <a-entity>
      // <a-plane>
      //   <a-gltf-model></a-gltf-model>
      // </a-plane>
      // </a-entity>;
    })
    .catch((err) => {
      console.log(err);
    });
}
fetchApi();
document.addEventListener("DOMContentLoaded", function () {
  const sceneEl = document.querySelector("a-scene");
  const arSystem = sceneEl.systems["mindar-image-system"];
  const exampleTarget = document.querySelectorAll("#example-target");
  const examplePlane = document.querySelectorAll("#example-plane");
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
  exampleTarget.forEach((item) => {
    item.addEventListener("targetFound", (event) => {
      console.log("target found");
    });
  });
  // detect target lost
  exampleTarget.forEach((item) => {
    item.addEventListener("targetLost", (event) => {
      console.log("target lost");
    });
  });
  // detect click event
  examplePlane.forEach((item) => {
    item.addEventListener("click", (event) => {
      console.log("plane click");
    });
  });
});
