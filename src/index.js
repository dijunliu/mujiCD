import "./styles.css";

const font = document.getElementById("Front");
const cd = document.getElementsByClassName("CD")[0];
font.addEventListener("click", function() {
  cd.className += " circle";
});
