const logo = document.getElementById("openingLogo");
const opening = document.getElementById("opening");
logo.addEventListener("animationend", () => {
  logo.style.animation = "openingAnimationMiddle 1.5s alternate infinite";
  setTimeout(() => {
    opening.style.display = "none";
  }, 3000);
});
