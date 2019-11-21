import "./iconFont/iconfont.css";
import "./font/DS-DIGI.css";
import "./styles.css";
import "./boxStyle.stylus";
import "./cdPlayer.stylus";
import "./pipe.css";
import "./controlPanel.css";
import "./openingAnimation.js";
import "./Music.js";
import CurveBox from "./CurveBox.js";
import Pipe from "./Pipe.js";
import { createCDPlayerBg, CDPlayer, optShadow } from "./cdPlayer.js";
import drag from "./drag.js";
import dragPipe from "./dragPipe.js";
import { ERR_OK } from "./api/config.js";
import { getAlbumDetail, getSingDetail } from "./api/album.js";

let songInforList = [],
  songList = [],
  songUrlList = [];

getAlbumDetail().then(res => {
  if (res.code === ERR_OK) {
    songInforList = res.albumSonglist.data.songList;
    songInforList.map(song => {
      songList.push({ name: song.songInfo.name, id: song.songInfo.mid });
    });
    songList.map(song => {
      getSingDetail(song.id).then(res => {
        songUrlList.push({
          name: song.name,
          url:
            "http://ws.stream.qqmusic.qq.com/" +
            res.req_0.data.midurlinfo[0].purl
        });
      });
    });
  }
});

document.body.style.display = "block";
const app = document.getElementById("app"),
  cdPlayer = document.getElementById("cdPlayer"),
  controlPanel = document.getElementById("controlPanel");

const box = new CurveBox(20, 20, 4.5, app);
box.addCurve(2, 20);

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

const top = document.getElementsByClassName("top")[0];

optShadow("optSoftShadom");
optShadow("optHardShadom");
top.addEventListener("click", function() {
  const box = document.getElementsByClassName("BoxContent")[0];
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
