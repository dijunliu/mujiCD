// export function _getTransform(traf) {
//   var matrix = traf,
//     rotateX = 0,
//     rotateY = 0,
//     rotateZ = 0;
//   if (matrix !== "none") {
//     // do some magic
//     var values = matrix
//         .split("(")[1]
//         .split(")")[0]
//         .split(","),
//       pi = Math.PI,
//       sinB = parseFloat(values[8]),
//       b = Math.round((Math.asin(sinB) * 180) / pi),
//       cosB = Math.cos((b * pi) / 180),
//       matrixVal10 = parseFloat(values[9]),
//       a = Math.round((Math.asin(-matrixVal10 / cosB) * 180) / pi),
//       matrixVal1 = parseFloat(values[0]),
//       c = Math.round((Math.acos(matrixVal1 / cosB) * 180) / pi);
//     rotateX = a;
//     rotateY = b;
//     rotateZ = c;
//   }
//   return {
//     rotateX: rotateX,
//     rotateY: rotateY,
//     rotateZ: rotateZ
//   };
// }
// export function randomNum(start, end) {
//   return Math.ceil((end - start) * Math.random() - end);
// }

// function parseMatrix(matrixString) {
//   var c = matrixString.split(/\s*[(),]\s*/).slice(1, -1),
//     matrix;

//   if (c.length === 6) {
//     // 'matrix()' (3x2)
//     matrix = {
//       m11: +c[0],
//       m21: +c[2],
//       m31: 0,
//       m41: +c[4],
//       m12: +c[1],
//       m22: +c[3],
//       m32: 0,
//       m42: +c[5],
//       m13: 0,
//       m23: 0,
//       m33: 1,
//       m43: 0,
//       m14: 0,
//       m24: 0,
//       m34: 0,
//       m44: 1
//     };
//   } else if (c.length === 16) {
//     // matrix3d() (4x4)
//     matrix = {
//       m11: +c[0],
//       m21: +c[4],
//       m31: +c[8],
//       m41: +c[12],
//       m12: +c[1],
//       m22: +c[5],
//       m32: +c[9],
//       m42: +c[13],
//       m13: +c[2],
//       m23: +c[6],
//       m33: +c[10],
//       m43: +c[14],
//       m14: +c[3],
//       m24: +c[7],
//       m34: +c[11],
//       m44: +c[15]
//     };
//   } else {
//     // handle 'none' or invalid values.
//     matrix = {
//       m11: 1,
//       m21: 0,
//       m31: 0,
//       m41: 0,
//       m12: 0,
//       m22: 1,
//       m32: 0,
//       m42: 0,
//       m13: 0,
//       m23: 0,
//       m33: 1,
//       m43: 0,
//       m14: 0,
//       m24: 0,
//       m34: 0,
//       m44: 1
//     };
//   }
//   return matrix;
// }
// export function getTransform(elem) {
//   var computedStyle = getComputedStyle(elem, null),
//     val =
//       computedStyle.transform ||
//       computedStyle.webkitTransform ||
//       computedStyle.MozTransform ||
//       computedStyle.msTransform,
//     matrix = parseMatrix(val),
//     rotateY = Math.asin(-matrix.m13),
//     rotateX,
//     rotateZ;

//   rotateX = Math.atan2(matrix.m23, matrix.m33);
//   rotateZ = Math.atan2(matrix.m12, matrix.m11);

//   /*if (Math.cos(rotateY) !== 0) {
//       rotateX = Math.atan2(matrix.m23, matrix.m33);
//       rotateZ = Math.atan2(matrix.m12, matrix.m11);
//   } else {
//       rotateX = Math.atan2(-matrix.m31, matrix.m22);
//       rotateZ = 0;
//   }*/

//   return {
//     transformStyle: val,
//     matrix: matrix,
//     rotate: {
//       x: rotateX,
//       y: rotateY,
//       z: rotateZ
//     },
//     translate: {
//       x: matrix.m41,
//       y: matrix.m42,
//       z: matrix.m43
//     }
//   };
// }
export function getTransformEsay(transformStr) {
  const results = transformStr.match(
      /rotateX\((\S+)deg\) rotateY\((\S+)deg\) translate3d\((.+)\)/
    ),
    transform = {};
  transform.rotateX = results[1];
  transform.rotateY = results[2];
  const translateRes = results[3];
  const translate = translateRes.match(/(-?\d+\.?\d*)px/g);
  transform.translateX = translate[0].slice(0, -2);
  transform.translateY = translate[1].slice(0, -2);
  transform.translateZ = translate[2].slice(0, -2);
  return transform;
}
