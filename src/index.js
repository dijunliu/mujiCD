import "./iconFont/iconfont.css";
import "./font/DS-DIGI.css";
import "./styles.css";
import "./boxStyle.stylus";
import "./cdPlayer.stylus";
import "./pipe.css";
import "./controlPanel.css";
import "./cdArea.css";
import "./manual.css";
import "./wheelEvent";
import "./globalControl";
import "./openingAnimation.js";
// import "./Music.js";
// import { albumList } from "./Music.js";
import CurveBox from "./CurveBox.js";
import Pipe from "./Pipe.js";
import { createCDPlayerBg, CDPlayer, optShadow } from "./cdPlayer.js";
import drag from "./drag.js";
import dragPipe from "./dragPipe.js";

document.body.style.display = "block";
const app = document.getElementById("app"),
  cdPlayer = document.getElementById("cdPlayer"),
  controlPanel = document.getElementById("controlPanel");

const box = new CurveBox(20, 20, 4.5, app, "contentBox");
box.addCurve(2, 20);
box.box.style.transform =
  "rotateX(0deg) rotateY(0deg) translate3d(660px, 100px, -200.2px)";

box.DomTexture({ front: cdPlayer, top: controlPanel });
box.render();
//drage cdplayer
drag(box.box);
//create pipebody
const cdBox = document.getElementsByClassName("BoxContent")[0];
const pipe = new Pipe(1, 40, cdBox);
pipe.render();

const pipeBox = pipe.box;

const pipeNode = new Pipe(1.5, 2, cdBox);

pipeNode.box.box.className += " pipeNode";
pipeNode.render();

createCDPlayerBg(90);
const cd = document.getElementsByClassName("CD")[0];

const player = new CDPlayer();
player.init();
dragPipe(pipeNode.box.box, player);
const BoxContent = document.getElementById("contentBox");
//there need optimization "top" element getter
const top = BoxContent.getElementsByClassName("top")[1];
optShadow("optSoftShadom");
optShadow("optHardShadom");
console.log(top);
top.addEventListener("click", function() {
  const box = document.getElementById("contentBox");
  box.style.transform = "rotateX(-63deg) translateZ(29rem) translateY(-50rem)";
  box.style.transition = "all 2s";
  box.addEventListener(
    "webkitTransitionEnd",
    function() {
      box.style.transition = "";
    },
    false
  );
});
