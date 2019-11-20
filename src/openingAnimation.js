const logo = document.getElementById("openingLogo"),
  opening = document.getElementById("opening");
let timer;
logo.addEventListener(
  "animationend",
  () => {
    logo.style.animation = "openingAnimationMiddle 4s forwards";
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      opening.style.display = "none";
    }, 4000);
  },
  { once: true }
);
