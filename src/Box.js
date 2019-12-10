export default class BOX {
  constructor(w, h, t, p = document.body, id = "", className = "") {
    this.id = id;
    this.className = className;
    this.width = w;
    this.height = h;
    this.thickness = t;
    this.parentNode = p;
    this.box = this.createBox();
    this.flats = [
      { name: "font", width: w, height: h },
      { name: "back", width: w, height: h },
      { name: "top", width: w, height: t },
      { name: "bottom", width: w, height: t },
      { name: "left", width: t, height: h },
      { name: "right", width: t, height: h }
    ];
    this.createFlat();
  }
  render() {
    this.renderFlat();
    this.parentNode.appendChild(this.box);
  }
  //创建立方体容器dom
  createBox() {
    const box = document.createElement("div");
    box.className = "BoxContent";
    box.id = this.id;
    box.className += " " + this.className;
    box.style.height = this.height + "rem";
    box.style.width = this.width + "rem";
    return box;
  }
  //存储贴图
  DomTexture(o) {
    if (typeof o === "object") {
      this.fontTexture = o.front ? o.front : null;
      this.backTexture = o.back ? o.back : null;
      this.topTexture = o.top ? o.top : null;
      this.bottomTexture = o.bottom ? o.bottom : null;
      this.leftTexture = o.left ? o.left : null;
      this.rightTexture = o.right ? o.right : null;
    }
  }
  createFlat() {
    let flatNum = this.flats.length;
    while (flatNum--) {
      const flatDom = document.createElement("div");
      flatDom.className = this.flats[flatNum].name;
      this.flats[flatNum].dom = flatDom;
    }
  }
  //创建六个平面，插入贴图
  renderFlat() {
    this.flats.map((flat, index) => {
      const flatDom = flat.dom;
      flatDom.style.width = flat.width + "rem";
      flatDom.style.height = flat.height + "rem";
      switch (index) {
        case 0:
          flatDom.style.transform = "translateZ(" + this.thickness / 2 + "rem)";
          if (this.fontTexture) {
            flatDom.appendChild(this.fontTexture);
          }
          this.front = flatDom;
          break;
        case 1:
          flatDom.style.transform =
            "translateZ(" + -this.thickness / 2 + "rem)";
          if (this.backTexture) {
            flatDom.appendChild(this.backTexture);
          }
          break;
        case 2:
          flatDom.style.transform =
            "rotateX(90deg) translateZ(" + this.thickness / 2 + "rem)";
          if (this.curves) {
            flatDom.style.width = flat.width - this.radius * 2 + "rem";
            flatDom.style.left = this.radius + "rem";
          }
          if (this.topTexture) {
            flatDom.appendChild(this.topTexture);
          }

          break;
        case 3:
          flatDom.style.transform =
            "rotateX(90deg) translateZ(" + -this.thickness / 2 + "rem)";
          if (this.curves) {
            flatDom.style.width = flat.width - this.radius * 2 + "rem";
            flatDom.style.left = this.radius + "rem";
          }
          if (this.bottomTexture) {
            flatDom.appendChild(this.bottomTexture);
          }

          break;
        case 4:
          flatDom.style.transform =
            "rotateY(90deg) translateZ(" + -(this.thickness / 2) + "rem)";
          if (this.curves) {
            flatDom.style.height = flat.height - this.radius * 2 + "rem";
            flatDom.style.top = this.radius + "rem";
          }
          if (this.leftTexture) {
            flatDom.appendChild(this.leftTexture);
          }

          break;
        case 5:
          flatDom.style.transform =
            "rotateY(-90deg) translateZ(" + -this.thickness / 2 + "rem)";
          if (this.curves) {
            flatDom.style.height = flat.height - this.radius * 2 + "rem";
            flatDom.style.top = this.radius + "rem";
          }
          if (this.rightTexture) {
            flatDom.appendChild(this.rightTexture);
          }

          break;

        default:
      }
      this.box.appendChild(flatDom);
    });
  }
}
