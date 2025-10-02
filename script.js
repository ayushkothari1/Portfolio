let tablinks = document.querySelectorAll(".tab-links");
let tabcontents = document.querySelectorAll(".tab-contents");
let frontName = document.querySelector(".front-end");

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

const names = ["Front-End Devloper", "Full stack Developer", "Learner"];
let nameIndex = 0;
let nameCharacterIndex = 0;

uptext();
function uptext() {
  frontName.innerHTML = `I am ${names[nameIndex].slice(0, nameCharacterIndex)}
  `;
  nameCharacterIndex++;
  if (nameCharacterIndex === names[nameIndex].length + 1) {
    nameIndex++;
    nameCharacterIndex = 0;
  }
  if (nameIndex === names.length) {
    nameIndex = 0;
  }
  setTimeout(uptext, 100);
}
