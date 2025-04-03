let tablinks = document.querySelector(".tab-links");
let tabcontents = document.querySelector(".tab-contents");

function opentab(tabname){
  for ( const tablink of tablinks) {
    tablink.classList.remove("active-link");
  }
  for ( const tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
}