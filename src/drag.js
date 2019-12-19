import { getTransformEsay } from "./tools.js";
let x = 0;
let y = 0,
  curX = 0,
  curY = 0;
let diffX = 0;
let diffY = 0;
let isDrawing = true;

let transform;

let isOK = true,
  mouseTimer;
let centerX = (document.documentElement.clientWidth / 8) * 7,
  centerY = -document.documentElement.clientHeight / 2;
let screen = {};

export function screenRotate(event) {
  if (isOK) {
    clearTimeout(mouseTimer);
    diffX = centerX - event.clientX;
    diffY = centerY - event.clientY;
    screen.style.transform =
      "rotateX(" +
      (parseInt(diffY / 80) + parseInt(curY)) +
      "deg) rotateY(" +
      (parseInt(diffX / 80) + parseInt(curX)) +
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

export function drag(elem) {
  screen = elem;
  // screen.addEventListener("mousedown", e => {
  //   console.log(centerY);

  //   console.log(document.documentElement.clientHeight);

  //   x = e.clientX;
  //   y = e.clientY;
  //   isDrawing = true;
  //   transform = getTransformEsay(screen.style.transform);
  //   curX = transform.rotateX;
  //   curY = transform.rotateY;
  // });

  transform = getTransformEsay(screen.style.transform);
  curX = transform.rotateX;
  curY = transform.rotateY;

  window.addEventListener("mousemove", screenRotate);
  window.addEventListener("mouseup", e => {
    if (isDrawing) {
      isDrawing = false;
    }
  });
}
