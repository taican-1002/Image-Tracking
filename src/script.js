var apiUrl = "http://localhost:8080/image/files";
var baseUrl = "http://localhost:8080/uploads/";
var apiGetImageCompiler = "http://localhost:8080/imageTargets/files";

const examplePlane = document.querySelectorAll("#example-plane");

const a_scene = document.querySelector("a-scene");
const a_assets = document.querySelector("#a_assets");
const divEle = document.createElement("div");

examplePlane.forEach((plane) => {
  plane.onclick = () => {
    plane.setAttribute(
      "animation",
      "property: rotation; to: 0 360 0; loop: false; dur: 10000"
    );
  };
});
// const getAllAttributes = (el) =>
//   el.getAttributeNames().reduce(
//     (obj, name) => ({
//       ...obj,
//       [name]: el.getAttribute(name),
//     }),
//     {}
//   );

(async function getImageTargetsCompiler() {
  await axios
    .get(apiGetImageCompiler)
    .then((res) => {
      const path = res.data.data[0].image_compiler.path.slice(
        12,
        res.data.data[0].image_compiler.path.length
      );
      a_scene.setAttribute(
        "mindar-image",
        `imageTargetSrc: ${baseUrl}${path};maxTrack: 5;autoStart: false;`
      );
    })
    .catch((err) => console.log(err));
})();

(async function getImageFile() {
  await axios
    .get(apiUrl)
    .then((res) => {
      console.log(res.data.data);
      //a_assets
      a_assets.innerHTML = res.data.data.map((item) => {
        const gltfFile = item.fileList.filter((item) =>
          item.filename.includes("gltf")
        )[0].filename;
        return (
          `<img src=${baseUrl}${item.id}${item.image.path.slice(
            48,
            item.image.path.length
          )} id=${item.idImage} />` +
          `<a-asset-item src=${baseUrl}${item.id}/${gltfFile} id=${item.id}></a-asset-item>`
        );
      });

      //a-entity
      divEle.innerHTML = res.data.data.map((item, index) => {
        return (
          `<a-entity id="a_entity" mindar-image-target=${index}>` +
          `<a-plane src=${
            "#" + item.idImage
          } id="a_plane" position="0 0 0" rotation="0 0 0" height="0.552" width="1">` +
          `<a-gltf-model src=#${item.id} animation-mixer position="${item.positionX} ${item.positionY} ${item.positionZ}" rotation="${item.rotationX} ${item.rotationY} ${item.rotationZ}" scale="${item.scaleX} ${item.scaleY} ${item.scaleZ}"></a-gltf-model>` +
          "</a-plane>" +
          "</a-entity>"
        );
      });

      a_scene.appendChild(divEle);
    })
    .catch((err) => {
      console.log(err);
    });
})();
