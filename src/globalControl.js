import { getTransformEsay } from "./tools";

let translateZ = 0,
  wheelTimer;

window.addWheelListener(document, function(e) {
  clearTimeout(wheelTimer);
  const content = document.getElementsByClassName("BoxContent")[0];
  const transform = getTransformEsay(content.style.transform);
  content.style.transition = "none";
  translateZ = parseInt(transform.translateZ) + e.deltaY / 3;
  if (translateZ < -300 && e.deltaY < 0) {
    content.style.transform =
      "rotateX(0deg) rotateY(0deg) translate3d(" +
      transform.translateX +
      "px, " +
      transform.translateY +
      "px, -1800px)";
    content.style.transition = "2s all";
    return;
  }
  content.style.transform =
    "rotateX(" +
    transform.rotateX +
    "deg) rotateY(" +
    transform.rotateY +
    "deg) translate3d(" +
    transform.translateX +
    "px, " +
    transform.translateY +
    "px, " +
    translateZ +
    "px)";

  wheelTimer = setTimeout(() => {
    translateZ = 0;
    content.style.transform = content.style.transform =
      "rotateX(0deg) rotateY(0deg) translate3d(" +
      transform.translateX +
      "px, " +
      transform.translateY +
      "px, -200px)";
    content.style.transition = "1s all";
  }, 500);
});
