document.querySelector(".header-btn_nav").addEventListener("click", function(){
    myFunction()
});

var x = document.querySelector('.header-nav');
x.addEventListener("click", function(){;
  if (x.className != 'header-nav') {
    x.className = 'header-nav';
    var y = document.querySelector(".header-btn_nav");
    y.className = 'header-btn_nav';
  }
});

function myFunction() {
    var x = document.querySelector(".header-nav");
    if (x.className === "header-nav") {
        x.className += " header-nav_active";
    } else {
        x.className = "header-nav";
    }

    var y = document.querySelector(".header-btn_nav");
    if (y.className === "header-btn_nav") {
        y.className += " header-btn_nav_active";
    } else {
        y.className = "header-btn_nav";
    }
}

