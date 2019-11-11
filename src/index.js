import "./styles.css";
import "./boxStyle.css";
import "./cdPlayer.css";
import "./pipe.css";
import CurveBox from "./CurveBox.js";
import Pipe from "./Pipe.js";
import { createCDPlayerBg, CDPlayer } from "./cdPlayer.js";
import drag from "./drag.js";
import dragPipe from "./dragPipe.js";

const app = document.getElementById("app");
const cdPlayer = document.getElementById("cdPlayer");

const box = new CurveBox(20, 20, 3.5, app);
box.addCurve(4, 20);
box.DomTexture({ front: cdPlayer });
box.render();
//drage cdplayer
drag(box.box);
//create pipebody
const cdBox = document.getElementsByClassName("BoxContent")[0];
const pipe = new Pipe(1, 40, cdBox);
pipe.render();

const pipeBox = pipe.box;

const pipeNode = new Pipe(2, 2, cdBox);

pipeNode.box.box.className += " pipeNode";
pipeNode.render();

createCDPlayerBg(90);
const cd = document.getElementsByClassName("CD")[0];
const player = new CDPlayer();
dragPipe(pipeNode.box.box, player);

const left = document.getElementsByClassName("left")[0],
  top = document.getElementsByClassName("top")[0];

top.addEventListener("click", function() {
  const box = document.getElementsByClassName("BoxContent")[0];
  box.style.transform = "rotateX(-60deg)";
  box.style.transition = "all 2s";
  box.addEventListener(
    "webkitTransitionEnd",
    function() {
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
