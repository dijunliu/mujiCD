import { getTransform } from "./tools.js";

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

  screen.addEventListener("mousedown", e => {
    x = e.clientX;
    y = e.clientY;
    isDrawing = true;
    let transformValue = window
      .getComputedStyle(screen)
      .getPropertyValue("transform");
    transform = getTransform(e.target);
    curX = transform.rotate.x;
    curY = transform.rotate.y;
  });
  let isOK = true;
  screen.addEventListener("mousemove", e => {
    if (isOK) {
      if (isDrawing) {
        diffX = x - e.clientX;
        diffY = y - e.clientY;
        screen.style.animation = "none";
        screen.style.transform =
          "rotateX(" +
          (curY + diffY) +
          "deg) rotateY(" +
          (diffX + curX) +
          "deg) translate3d(" +
          transform.translate.x +
          "px," +
          transform.translate.y +
          "px," +
          transform.translate.z +
          "px)";
        setTimeout(function() {
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
