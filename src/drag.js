import { _getTransform } from "./tools.js";

export default function drag(elem) {
  let x = 0;
  let y = 0,
    curX = 0,
    curY = 0;
  let diffX = 0;
  let diffY = 0;
  let isDrawing = false;

  let rotates = {};
  const screen = elem;

  screen.addEventListener("mousedown", e => {
    x = e.clientX;
    y = e.clientY;
    isDrawing = true;
    let transformValue = window
      .getComputedStyle(screen)
      .getPropertyValue("transform");

    rotates = _getTransform(transformValue);
    curX = isNaN(rotates.rotateX) ? 0 : rotates.rotateX;
    curY = isNaN(rotates.rotateY) ? 0 : rotates.rotateY;
  });
  let isOK = true;
  screen.addEventListener("mousemove", e => {
    if (isOK) {
      if (isDrawing) {
        diffX = x - e.clientX;
        diffY = y - e.clientY;
        screen.style.animation = "none";
        screen.style.transform =
          "rotateY(" +
          (diffX + curX) +
          "deg) rotateX(" +
          (curY + diffY) +
          "deg) translate(-50%,-50%)";

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
