import { musics } from "./cdPlayer.js";
import { rotateCd } from "./cdPlayer.js";
export default function dragPipe(elem, cdPlayer) {
  let x = 0;
  let y = 0,
    curX = 0,
    curY = 0;
  let diffX = 0;
  let diffY = 0;
  let isDrawing = false;

  const screen = elem;

  screen.addEventListener("mousedown", e => {
    var ev = e || window.event;
    if (ev && ev.stopPropagation) {
      //非IE浏览器
      ev.stopPropagation();
    } else {
      //IE浏览器(IE11以下)
      ev.cancelBubble = true;
    }
    x = e.clientX;
    y = e.clientY;
    isDrawing = true;
    curY = parseInt(window.getComputedStyle(screen).getPropertyValue("top"));
  });

  let isOK = true;
  window.addEventListener("mousemove", e => {
    var ev = e || window.event;
    if (ev && ev.stopPropagation) {
      //非IE浏览器
      ev.stopPropagation();
    } else {
      //IE浏览器(IE11以下)
      ev.cancelBubble = true;
    }
    if (isOK) {
      if (isDrawing) {
        diffX = x - e.clientX;
        diffY = y - e.clientY;
        screen.style.top = curY - diffY + "px";
      }
      setTimeout(function() {
        isOK = true;
      }, 16);
      isOK = false;
    }
  });
  window.addEventListener("mouseup", e => {
    var ev = e || window.event;
    if (ev && ev.stopPropagation) {
      //非IE浏览器
      ev.stopPropagation();
    } else {
      //IE浏览器(IE11以下)
      ev.cancelBubble = true;
    }
    if (isDrawing) {
      isDrawing = false;
      if (parseInt(screen.style.top) > 1) {
        if (cdPlayer.isPlay) {
          cdPlayer.next();
        } else {
          cdPlayer.play();
        }

        const cd = document.getElementsByClassName("CD")[0];
        rotateCd(cd);
        // cd.addEventListener(
        //   "animationend",
        //   function() {
        //     this.className = "CD circle";
        //   },
        //   false
        // );
      }
      screen.style.transition = "all 0.5s cubic-bezier(0, 0, 0.05, 0.99) 0s";
      screen.style.top = "0px";
    }
  });
}
