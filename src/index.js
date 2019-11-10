import "./styles.css";
import "./boxStyle.css";
import CurveBox from "./CurveBox.js";
import { createCDPlayerBg, rotateCd, CDPlayer } from "./cdPlayer.js";

const app = document.getElementById("app");
const cdPlayer = document.getElementById("cdPlayer");

const box = new CurveBox(20, 20, 3.5, app);
box.addCurve(4, 20);
box.DomTexture({ front: cdPlayer });
box.render();
createCDPlayerBg(90);
const cd = document.getElementsByClassName("CD")[0];
const player = new CDPlayer();

cd.addEventListener("click", rotateCd);
cd.addEventListener("click", player.play.bind(player));

const left = document.getElementsByClassName("left")[0],
  top = document.getElementsByClassName("top")[0];

top.addEventListener("click", function() {
  const box = document.getElementsByClassName("BoxContent")[0];
  box.style.transform = "rotateX(-60deg)";
  box.style.transition = "all 2s";
  box.addEventListener(
    "webkitTransitionEnd",
    function() {
      console.log(123);
      box.style.transition = "";
    },
    false
  );
});
left.addEventListener("click", player.next.bind(player));

cd.addEventListener(
  "animationend",
  function() {
    this.className = "CD circle";
  },
  false
);
