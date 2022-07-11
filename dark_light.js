
  document.addEventListener("DOMContentLoaded", function(event) {
    document.documentElement.setAttribute("data-theme", "light");
var themeSwitcher = document.getElementById("theme-switcher");
 
themeSwitcher.onclick = function(){
    var switchTo = "dark";
    document.documentElement.setAttribute("data-theme", switchTo);
}
  });