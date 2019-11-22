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

export function optShadow(className) {
  const back = document.getElementsByClassName("back wall")[0],
    s = document.createElement("div");
  s.className = className;
  back.appendChild(s);
}

export class CDPlayer {
  constructor(albumPromise) {
    albumPromise.then(album => {
      this.coverImage = album.coverImage;
      this.musicList = album.songUrlList;
      this.palyer = new Audio(this.musicList[0].url);
      this.musicNum = this.musicList.length;
    });

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
    this.NextButton = document.getElementById("MNext");
    this.PreButton = document.getElementById("MPre");
    this.isPlay = false;
    this.isCdAnimation = false;
    this.volume = 0.1;
    this.currentMusic = 0;
    this.panelDivs = document
      .getElementById("showPanel")
      .getElementsByTagName("div");
  }
  init() {
    this.cd = document.getElementsByClassName("CD")[0];
    this.cd.style.backgroundImage = "url(" + this.coverImage + ")";
    const back = document.getElementsByClassName("back")[0];
    back.className += " wall";
    this.addClickEvent(this.volumeUpButton, this.volumeUp.bind(this));
    this.addClickEvent(this.volumeDownButton, this.volumeDown.bind(this));
    this.addClickEvent(this.NextButton, this.timeForward.bind(this));
    this.addClickEvent(this.PreButton, this.timeReturn.bind(this));
    this.NextButton.addEventListener("dblclick", () => {
      if (this.timeControlTimer) {
        clearTimeout(this.timeControlTimer);
      }
      this.next();
    });
    this.PreButton.addEventListener("dblclick", () => {
      if (this.timeControlTimer) {
        clearTimeout(this.timeControlTimer);
      }
      this.pre();
    });
    this.modeSwitchButton.addEventListener("click", e => {
      this.stopPro(e);
      this.showModeSwitch();
    });
    this.buttonAnimation();
    this.showCdFree();
  }
  addClickEvent(elem, fn) {
    elem.addEventListener("click", e => {
      this.stopPro(e);
    });
    elem.addEventListener("mousedown", e => {
      const that = this;
      function volSet() {
        fn();
        that.volTimer = setTimeout(volSet, 1000);
      }
      volSet();
    });
    elem.addEventListener("mouseup", e => {
      if (this.volTimer) {
        clearTimeout(this.volTimer);
      }
    });
    elem.addEventListener("mouseout", e => {
      if (this.volTimer) {
        clearInterval(this.volTimer);
      }
    });
  }
  stopPro(e) {
    var ev = e || window.event;
    if (ev && ev.stopPropagation) {
      //非IE浏览器
      ev.stopPropagation();
    } else {
      //IE浏览器(IE11以下)
      ev.cancelBubble = true;
    }
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
    this.hiddenVol();
  }
  hiddenVol() {
    if (this.timeOutId) {
      clearTimeout(this.timeOutId);
    }
    const that = this;
    this.timeOutId = setTimeout(() => {
      that.volControl.style.display = "none";
      that.showCdPlay();
    }, 1000);
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
    this.palyer.src = this.musicList[this.currentMusic].url;
    this.palyer.play();
    this.showCdPlay();
    this.isPlay = true;
    if (!this.isCdAnimation) {
      this.cdAnimation();
    }
    this.cd.style.backgroundImage = "url(" + this.coverImage + ")";
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
  timeForward() {
    if (this.timeControlTimer) {
      clearTimeout(this.timeControlTimer);
    }
    this.timeControlTimer = setTimeout(() => {
      this.palyer.currentTime += 10;
    }, 500);
  }
  timeReturn() {
    if (this.timeControlTimer) {
      clearTimeout(this.timeControlTimer);
    }
    this.timeControlTimer = setTimeout(() => {
      this.palyer.currentTime -= 10;
    }, 500);
  }
  cdAnimation() {
    const cd = document.getElementsByClassName("CD")[0];
    cd.style.animation = "circle 4s  cubic-bezier(0.74, 0.01, 0.68, 0.44)";
    cd.addEventListener(
      "animationend",
      function() {
        cd.style.animation = "circle 2s 4s infinite linear";
      },
      { once: true }
    );
    this.isCdAnimation = true;
  }
  buttonAnimation() {
    const Cbuttons = document.getElementsByClassName("Cbutton");
    Array.prototype.map.bind(Cbuttons)(Cbutton => {
      Cbutton.addEventListener("mousedown", () => {
        Cbutton.style.boxShadow =
          "rgba(0, 0, 0, 0.51) -0.3px 0.3px 0px 0.5px, rgba(101, 101, 101, 0.37) 0px 0px 0px 0px inset";
      });
      Cbutton.addEventListener("mouseup", () => {
        Cbutton.style.boxShadow =
          "-0.3px 0.3px 0px 0.5px #00000082, inset 0.4px -0.9px 0px 0.5px #6565655e";
      });
    });
    return true;
  }
  towDigit(timeNum) {
    let num = parseInt(timeNum);
    return num > 9 ? num : "0" + num;
  }
}
