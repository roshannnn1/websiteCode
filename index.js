/* When the user clicks the profile button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.nav-btn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  
document.addEventListener("DOMContentLoaded", function(event) {
document.documentElement.setAttribute("data-theme", "light");
var themeSwitcher = document.getElementById("theme-switcher");
 
themeSwitcher.onclick = function(){
    var currentTheme = document.documentElement.getAttribute("data-theme");
    
    if(currentTheme === "light"){
        var switchTo = "dark";
    }
    else 
     switchTo = "light";
    document.documentElement.setAttribute("data-theme", switchTo);
}
  });