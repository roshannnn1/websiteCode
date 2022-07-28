//opens pop up for login and signup
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);
  
  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);
  
  });
  
  
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

