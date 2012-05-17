var install = function() {

  var info = document.createElement("p"),
      text = document.createTextNode("Please add to homescreen to install.");

  info.appendChild(text);
  document.body.appendChild(info);
  document.body.setAttribute("id","install");

},
launch = function() {

  var hiddenClass = "hidden",
      displayFirstScreenshot = function(){
        document.querySelector("img").removeAttribute("class");
      },
      createScreenshot = function(i){
        var screenshot = document.createElement("img");
        screenshot.setAttribute(
          "src", "screenshots/" + i + ".png?" + Math.round(Math.random()*100000)
        );
        screenshot.setAttribute("class",hiddenClass);
        screenshot.addEventListener("touchend", function(){
          this.setAttribute("class",hiddenClass);
          if (this.webkitMatchesSelector(":last-child"))
            displayFirstScreenshot();
          else
            this.nextSibling.removeAttribute("class");
        });
        screenshot.addEventListener("load", function(){
          createScreenshot(i+1);
          document.body.appendChild(screenshot);
          if(i == 1) {
            document.body.setAttribute("id","launch");
            displayFirstScreenshot();
          }
        });
      };

  createScreenshot(1);

},
init = function() {
  if (!navigator.standalone)
    install();
  else
    launch();
};

window.addEventListener("load", init);