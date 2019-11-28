import Box from "./Box.js";
import { _getTransform } from "./tools.js";

export default class CurveBox extends Box {
  constructor(w, h, t, p = document.body, id) {
    super(w, h, t, p, id);
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
    function renderCurve(curveBox, dir) {
      let curvenum = curveNum;
      curveBox.child = [];
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
        curveBox.dom.appendChild(curve);
        curveBox.child.push(curve);
      }
    }
    renderCurve(this.curves[0], -1);
    renderCurve(this.curves[1], 1);
    renderCurve(this.curves[2], -1);
    renderCurve(this.curves[3], 1);

    this.moveCurve(radius, width / 2);
    this.changeFB(radius);
    // this.moveFlats();
    this.addCurveShadow(this.curves[0]);
    this.addCurveShadow(this.curves[1]);
    this.addCurveHighlight(this.curves[2]);
    this.addCurveHighlight(this.curves[3]);
  }
  addCurveShadow(curves) {
    curves.child.map(curve => {
      let rotate = parseInt(curve.style.transform.split("(")[1].split("d")[0]),
        grad =
          "linear-gradient(rgba(144,144,144," +
          (Math.cos(toRad(rotate) * 1).toFixed(2) * 0.6 + 0.15) +
          "),rgba(144,144,144," +
          (Math.cos(toRad(rotate) * 1).toFixed(2) * 0.6 + 0.15) +
          "))";

      curve.style.background = grad + ",rgb(239, 239, 239)";
    });
  }
  addCurveHighlight(curves) {
    curves.child.map(curve => {
      let rotate = parseInt(curve.style.transform.split("(")[1].split("d")[0]),
        grad =
          "linear-gradient(rgba(255,255,255," +
          Math.cos(toRad(rotate) * 1).toFixed(2) * 0.2 +
          "),rgba(255,255,255," +
          Math.cos(toRad(rotate) * 1).toFixed(2) * 0.2 +
          "))";

      curve.style.background = grad + ",rgb(239, 239, 239)";
      curve.style.background =
        "linear-gradient(90deg, #dedede, rgba(132,132,132,0) 19%),rgb(239, 239, 239)";
    });
  }
}
function toAngle(rad) {
  return (rad * 180) / Math.PI;
}
function toRad(deg) {
  return (deg * Math.PI) / 180;
}
