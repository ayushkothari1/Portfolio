let tablinks = document.querySelectorAll(".tab-links");
let tabcontents = document.querySelectorAll(".tab-contents");

tablinks.forEach((links, index) => {
  links.addEventListener("click", function () {
    tablinks.forEach((tab) => tab.classList.remove("active-links"));
    links.classList.add("active-links");
    tabcontents.forEach(function (e) {
      e.classList.remove("active-tab");
    });
    tabcontents[index].classList.add("active-tab");
  });
});
