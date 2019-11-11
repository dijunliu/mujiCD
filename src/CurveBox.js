import Box from "./Box.js";

export default class CurveBox extends Box {
  constructor(w, h, t, p = document.body) {
    super(w, h, t, p);
    this.curves = [];
    this.createCureveBox(this.flats[4]);
    this.createCureveBox(this.flats[5]);
  }
  createCureveBox(flat) {
    const cureveT = document.createElement("div");
    const cureveB = document.createElement("div");
    cureveT.className = flat.name + "Top";
    cureveB.className = flat.name + "Bottom";
    this.curves.push({ name: cureveT.className, dom: cureveT });
    this.curves.push({ name: cureveB.className, dom: cureveB });
    flat.dom.appendChild(cureveT);
    flat.dom.appendChild(cureveB);
  }
  moveCurve(radius, offset) {
    this.curves.map(curve => {
      curve.dom.style.transform =
        "translateY(" + -offset + "rem) translateZ(" + radius + "rem)";
    });
  }
  moveFlats() {
    this.flats.map((flat, index) => {
      if (index === 2 || index === 3) {
        flat.dom.style.width = "10rem";
      }
    });
  }
  changeFB(radius) {
    this.flats[0].dom.style.borderRadius = radius + "rem";
    this.flats[1].dom.style.borderRadius = radius + "rem";
  }
  addCurve(radius, curveNum) {
    this.radius = radius;
    let angle = Math.PI / (2 * curveNum);
    let width = (2 * radius * Math.sin(angle / 2)).toFixed(2);
    function renderCurve(ParentElem, dir) {
      let curvenum = curveNum;
      while (curvenum--) {
        const curve = document.createElement("div");
        curve.className = "curve";
        curve.style.height = width + "rem";
        curve.style.transform =
          "rotateX(" +
          dir * toAngle(curvenum * angle + angle / 2) +
          "deg) translateZ(" +
          -Math.ceil(radius * Math.cos(angle / 2), 2) +
          "rem)";
        ParentElem.appendChild(curve);
      }
    }
    renderCurve(this.curves[0].dom, -1);
    renderCurve(this.curves[1].dom, 1);
    renderCurve(this.curves[2].dom, -1);
    renderCurve(this.curves[3].dom, 1);

    this.moveCurve(radius, width / 2);
    this.changeFB(radius);
    // this.moveFlats();
  }
}
function toAngle(rad) {
  return (rad * 180) / Math.PI;
}
