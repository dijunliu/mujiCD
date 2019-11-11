export const musics = [
  {
    id: 0,
    name: "野狼disco",
    img:
      "http://p2.music.126.net/USRrIEfSNxJ4JnfKp4f6pA==/109951164470147956.jpg?param=130y130",
    audio: "./src/music/yldisco.m4a"
  },
  {
    id: 1,
    name: "Drive Time",
    img:
      "http://p2.music.126.net/QDswnxhPg0cMmz74sI_1lw==/1695446930032062.jpg?param=130y130",
    audio: "./src/music/drivetime.m4a"
  },
  {
    id: 2,
    name: "普通朋友",
    img:
      "http://p1.music.126.net/6pIcF4ZAL5euujMUNSt8PQ==/109951164124479906.jpg?param=130y130",
    audio: "./src/music/ptpy.m4a"
  }
];

export function createCDPlayerBg(num) {
  let cdBgsNum = num;
  const cdBgs = document.getElementsByClassName("cdBgs")[0],
    cdBgModel = document.getElementsByClassName("cdBg")[0],
    cddeg = toAngle(Math.PI / cdBgsNum);
  while (cdBgsNum--) {
    const cdBg = cdBgModel.cloneNode(true);
    cdBg.style.transform += "rotate(" + cddeg * cdBgsNum + "deg) ";
    cdBgs.appendChild(cdBg);
  }
  function toAngle(rad) {
    return (rad * 180) / Math.PI;
  }
}

export function rotateCd(elem) {
  elem.className += " circleInit";
}

export class CDPlayer {
  constructor() {
    this.palyer = new Audio(musics[0].audio);
    this.cd = document.getElementsByClassName("CD")[0];
    this.cd.style.backgroundImage = "url(" + musics[0].img + ")";
    const back = document.getElementsByClassName("back")[0];
    back.className += " wall";
    this.isPlay = false;
  }
  play() {
    this.palyer.play();
    this.isPlay = true;
  }
  next() {
    this.palyer.src = musics[1].audio;
    this.palyer.play();
    this.isPlay = true;
    this.cd.style.backgroundImage = "url(" + musics[1].img + ")";
  }
}
