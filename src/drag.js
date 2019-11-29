import { getTransformEsay } from "./tools.js";

export default function drag(elem) {
  let x = 0;
  let y = 0,
    curX = 0,
    curY = 0;
  let diffX = 0;
  let diffY = 0;
  let isDrawing = false;

  let transform;
  const screen = elem;
  let isOK = true,
    mouseTimer;
  screen.addEventListener("mousedown", e => {
    x = e.clientX;
    y = e.clientY;
    isDrawing = true;
    transform = getTransformEsay(screen.style.transform);
    curX = transform.rotateX;
    curY = transform.rotateY;
  });

  screen.addEventListener("mousemove", e => {
    if (isOK) {
      if (isDrawing) {
        clearTimeout(mouseTimer);
        diffX = x - e.clientX;
        diffY = y - e.clientY;
        screen.style.transform =
          "rotateX(" +
          (parseInt(diffY) + parseInt(curY)) +
          "deg) rotateY(" +
          (parseInt(diffX) + parseInt(curX)) +
          "deg) translate3d(" +
          transform.translateX +
          "px," +
          transform.translateY +
          "px," +
          transform.translateZ +
          "px)";
        mouseTimer = setTimeout(() => {
          isOK = true;
        }, 16);
        isOK = false;
      }
    }
  });
  window.addEventListener("mouseup", e => {
    if (isDrawing) {
      isDrawing = false;
    }
  });
}
