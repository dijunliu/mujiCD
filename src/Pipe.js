import CurveBox from "./CurveBox.js";

export default class Pipe {
  constructor(radius, length, el) {
    this.box = new CurveBox(radius * 2, radius * 2, length, el);
    this.box.addCurve(radius, 40);
    this.box.box.className += " pipe";
  }
  render() {
    this.box.render();
  }
}
