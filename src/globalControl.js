import { getTransformEsay } from "./tools";
function parseMatrix(matrixString) {
  var c = matrixString.split(/\s*[(),]\s*/).slice(1, -1),
    matrix;

  if (c.length === 6) {
    // 'matrix()' (3x2)
    matrix = {
      m11: +c[0],
      m21: +c[2],
      m31: 0,
      m41: +c[4],
      m12: +c[1],
      m22: +c[3],
      m32: 0,
      m42: +c[5],
      m13: 0,
      m23: 0,
      m33: 1,
      m43: 0,
      m14: 0,
      m24: 0,
      m34: 0,
      m44: 1
    };
  } else if (c.length === 16) {
    // matrix3d() (4x4)
    matrix = {
      m11: +c[0],
      m21: +c[4],
      m31: +c[8],
      m41: +c[12],
      m12: +c[1],
      m22: +c[5],
      m32: +c[9],
      m42: +c[13],
      m13: +c[2],
      m23: +c[6],
      m33: +c[10],
      m43: +c[14],
      m14: +c[3],
      m24: +c[7],
      m34: +c[11],
      m44: +c[15]
    };
  } else {
    // handle 'none' or invalid values.
    matrix = {
      m11: 1,
      m21: 0,
      m31: 0,
      m41: 0,
      m12: 0,
      m22: 1,
      m32: 0,
      m42: 0,
      m13: 0,
      m23: 0,
      m33: 1,
      m43: 0,
      m14: 0,
      m24: 0,
      m34: 0,
      m44: 1
    };
  }
  return matrix;
}
function getTransform(elem) {
  var computedStyle = getComputedStyle(elem, null),
    val =
      computedStyle.transform ||
      computedStyle.webkitTransform ||
      computedStyle.MozTransform ||
      computedStyle.msTransform,
    matrix = parseMatrix(val),
    rotateY = Math.asin(-matrix.m13),
    rotateX,
    rotateZ;

  rotateX = Math.atan2(matrix.m23, matrix.m33);
  rotateZ = Math.atan2(matrix.m12, matrix.m11);

  /*if (Math.cos(rotateY) !== 0) {
      rotateX = Math.atan2(matrix.m23, matrix.m33);
      rotateZ = Math.atan2(matrix.m12, matrix.m11);
  } else {
      rotateX = Math.atan2(-matrix.m31, matrix.m22);
      rotateZ = 0;
  }*/

  return {
    transformStyle: val,
    matrix: matrix,
    rotate: {
      x: rotateX,
      y: rotateY,
      z: rotateZ
    },
    translate: {
      x: matrix.m41,
      y: matrix.m42,
      z: matrix.m43
    }
  };
}
let translateZ = 0;

window.addWheelListener(document, function(e) {
  const content = document.getElementsByClassName("BoxContent")[0];
  const transform = getTransformEsay(content.style.transform);
  translateZ -= e.deltaY;
  console.log(translateZ);

  content.style.transform =
    "rotateX(" +
    transform.rotateX +
    "deg) rotateY(" +
    transform.rotateY +
    "deg) translate3d(" +
    transform.translateX +
    "px, " +
    transform.translateY +
    "px, " +
    translateZ +
    "px)";
  // "rotateX(" +
  //   transform.rotateX +
  //   ") rotateY(" +
  //   transform.rotateY +
  //   ") translate3d(" +
  //   transform.translateX +
  //   "px," +
  //   transform.translateY +
  //   "px," +
  //   translateZ +
  //   "px)";
});
