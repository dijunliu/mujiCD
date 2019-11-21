const logo = document.getElementById("openingLogo");
const opening = document.getElementById("opening");
logo.addEventListener("animationend", () => {
  logo.style.animation = "openingAnimationMiddle 4s forwards";
  setTimeout(() => {
    opening.style.animation = "SlowHidden 4s forwards";
    opening.addEventListener("animationend", () => {
      opening.style.display = "none";
    });
  }, 4000);
});
