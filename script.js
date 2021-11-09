// Mobile nav

const hamburgerIcon = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");
const handleToggleMenu = () => {
  if (nav.style.maxHeight === "200px") {
    nav.style.maxHeight = "0";
  } else {
    nav.style.maxHeight = "200px";
  }
};
hamburgerIcon.addEventListener("click", handleToggleMenu);
