const logo = document.getElementById("openingLogo");
const opening = document.getElementById("opening");
logo.addEventListener("animationend", () => {
  logo.style.animation = "openingAnimationMiddle 4s forwards";
  setTimeout(() => {
    opening.style.opacity = "0";
    opening.addEventListener("transitionend", () => {
      opening.style.display = "none";
    });
  }, 4000);
});
