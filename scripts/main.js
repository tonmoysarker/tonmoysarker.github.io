const NAV_BTN = document.querySelector("#menu-toggle");
const MOBILE_NAV = document.querySelector("#mobile-nav");
let mobileMenuOpen = false;

NAV_BTN.addEventListener("click", toggleMobileNav);

function toggleMobileNav() {
  if (mobileMenuOpen) {
    MOBILE_NAV.style.display = "none";
  } else {
    MOBILE_NAV.style.display = "block";
  }
  mobileMenuOpen = !mobileMenuOpen;
}
