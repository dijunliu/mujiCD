export const musics = [
  {
    id: 0,
    name: "野狼disco",
    img:
      "http://5b0988e595225.cdn.sohucs.com/images/20190924/1945a3a8c7a54d79a7e6e2f3f1b117dd.jpeg",
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
  // elem.className = "CD circleInit";

  elem.style.transition = "2s all";
  elem.style.transform = "rotate(360deg) translate(-50%, -50%)";
  console.log(elem.className);
}

export function optShadow(className) {
  const back = document.getElementsByClassName("back wall")[0],
    s = document.createElement("div");
  s.className = className;
  back.appendChild(s);
}

export class CDPlayer {
  constructor() {
    this.palyer = new Audio(musics[0].audio);
    this.cdFree = document.getElementById("cdFree");
    this.cdFreeValue = this.cdFree.getElementsByClassName("showValue")[0];
    this.cdPlay = document.getElementById("cdPlay");
    this.cdPlayAttr = this.cdPlay.getElementsByClassName("showAttr")[0];
    this.cdPlayValue = this.cdPlay.getElementsByClassName("showValue")[0];
    this.volControl = document.getElementById("volControl");
    this.volControlValue = this.volControl.getElementsByClassName(
      "showValue"
    )[0];
    this.musicSwitch = document.getElementById("musicSwitch");
    this.fmPlay = document.getElementById("fmPlay");
    this.modeSwitch = document.getElementById("modeSwitch");
    this.modeSwitchButton = document.getElementById("PMode");
    this.volumeUpButton = document.getElementById("VUp");
    this.volumeDownButton = document.getElementById("VDown");
    this.musicNextButton = document.getElementById("MNext");
    this.musicPreButton = document.getElementById("MPre");
    this.isPlay = false;
    this.palyer.volume = 0.1;
    this.volume = this.palyer.volume;
    this.musicNum = musics.length;
    this.currentMusic = 0;
    this.panelDivs = document
      .getElementById("showPanel")
      .getElementsByTagName("div");
  }
  init() {
    this.cd = document.getElementsByClassName("CD")[0];
    this.cd.style.backgroundImage = "url(" + musics[0].img + ")";
    const back = document.getElementsByClassName("back")[0];
    back.className += " wall";
    this.volumeUpButton.addEventListener("click", () => {
      this.volumeUp();
    });
    this.volumeDownButton.addEventListener("click", () => {
      this.volumeDown();
    });
    this.musicNextButton.addEventListener("click", () => {
      this.next();
    });
    this.musicPreButton.addEventListener("click", () => {
      this.pre();
    });
    this.modeSwitchButton.addEventListener("click", () => {
      this.showModeSwitch();
    });
    this.buttonAnimation();
    this.showCdFree();
  }
  hiddenAllPanel() {
    Array.prototype.map.bind(this.panelDivs)(panelDiv => {
      panelDiv.style.display = "none";
    });
  }
  showCdFree() {
    this.hiddenAllPanel();
    this.timeTimer();
    this.cdFree.style.display = "block";
  }

  showCdPlay() {
    this.hiddenAllPanel();
    this.cdPlayAttr.innerText = this.towDigit(this.currentMusic + 1);
    this.currentTimeTimer();
    this.cdPlay.style.display = "block";
  }
  currentTimeTimer() {
    if (this.currentTimerId) {
      clearInterval(this.currentTimerId);
    }
    const that = this;
    this.currentTimerId = setInterval(() => {
      let time = Math.floor(that.palyer.currentTime),
        minutes = time > 60 ? Math.floor(time / 60) : 0,
        second = time % 60;
      that.cdPlayValue.innerText =
        this.towDigit(minutes) + ":" + this.towDigit(second);
    }, 1000);
  }
  showModeSwitch() {
    this.hiddenAllPanel();
    this.modeSwitch.style.display = "block";
  }
  showVolControl() {
    this.hiddenAllPanel();
    this.volControlValue.innerText = Math.round(this.volume * 10);
    this.volControl.style.display = "block";
    this.timeOut();
  }
  timeOut() {
    if (this.timeOutId) {
      clearTimeout(this.timeOutId);
    }
    const that = this;
    this.timeOutId = setTimeout(() => {
      that.volControl.style.display = "none";
      that.showCdPlay();
    }, 1500);
  }
  timeTimer() {
    if (this.timeTimerId) {
      clearInterval(this.timeTimerId);
    }
    const that = this;
    this.timeTimerId = setInterval(() => {
      let hours = new Date().getHours(),
        minutes = new Date().getMinutes();
      that.cdFreeValue.innerText =
        that.towDigit(hours) + ":" + that.towDigit(minutes);
    }, 1000);
  }
  play() {
    this.palyer.src = musics[this.currentMusic].audio;
    this.palyer.play();
    this.showCdPlay();
    this.isPlay = true;
    this.cd.style.backgroundImage =
      "url(" + musics[this.currentMusic].img + ")";
  }
  next() {
    if (this.currentMusic < this.musicNum - 1) {
      this.currentMusic += 1;
    } else {
      this.currentMusic = 0;
    }
    this.play();
  }
  pre() {
    if (this.currentMusic > 0) {
      this.currentMusic -= 1;
    } else {
      this.currentMusic = this.musicNum - 1;
    }
    this.play();
  }
  volumeUp() {
    if (this.volume < 1) {
      this.volume = this.palyer.volume +=
        1 - this.volume < 0.1 ? 1 - this.volume : 0.1;
    }
    this.showVolControl();
  }
  volumeDown() {
    if (this.volume > 0) {
      this.volume = this.palyer.volume -= this.volume < 0.1 ? this.volume : 0.1;
    }
    this.showVolControl();
  }
  buttonAnimation() {
    const Cbuttons = document.getElementsByClassName("Cbutton");
    Array.prototype.map.bind(Cbuttons)(Cbutton => {
      Cbutton.addEventListener("mousedown", () => {
        Cbutton.style.boxShadow =
          "-0.3px 0.3px 0.1px 0.5px #00000082, inset 0.4px -0.9px 0.6px -1px #6565655e";
      });
      Cbutton.addEventListener("mouseup", () => {
        Cbutton.style.boxShadow =
          "-0.3px 0.3px 0.1px 0.5px #00000082, inset 0.4px -0.9px 0.6px 0.5px #6565655e";
      });
    });
    return true;
  }
  towDigit(timeNum) {
    let num = parseInt(timeNum);
    return num > 9 ? num : "0" + num;
  }
}
