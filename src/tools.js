export function _getTransform(traf) {
  var matrix = traf,
    rotateX = 0,
    rotateY = 0,
    rotateZ = 0;

  if (matrix !== "none") {
    // do some magic
    var values = matrix
        .split("(")[1]
        .split(")")[0]
        .split(","),
      pi = Math.PI,
      sinB = parseFloat(values[8]),
      b = Math.round((Math.asin(sinB) * 180) / pi),
      cosB = Math.cos((b * pi) / 180),
      matrixVal10 = parseFloat(values[9]),
      a = Math.round((Math.asin(-matrixVal10 / cosB) * 180) / pi),
      matrixVal1 = parseFloat(values[0]),
      c = Math.round((Math.acos(matrixVal1 / cosB) * 180) / pi);
    rotateX = a;
    rotateY = b;
    rotateZ = c;
  }
  return {
    rotateX: rotateX,
    rotateY: rotateY,
    rotateZ: rotateZ
  };
}
