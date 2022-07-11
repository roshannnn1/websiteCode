
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