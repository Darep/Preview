(function () {

function install() {
    var info = document.createElement("p");
    var text = document.createTextNode("Please add to homescreen to install.");
    var wrap = document.getElementById('wrap');

    info.appendChild(text);
    wrap.innerHTML = "";
    wrap.appendChild(info);
    document.body.setAttribute('id', 'install');
}

function launch() {
    
    var hiddenClass = "hidden";
    var wrap = document.getElementById('wrap');
    
    function displayFirstScreenshot() {
        document.querySelector("img").removeAttribute("class");
    }
    
    function createScreenshot(i) {
        var screenshot = document.createElement("img");
        var imgUrl = "screenshots/" + i + ".png";
        
        screenshot.setAttribute(
            "src", imgUrl + "?" + Math.round(Math.random()*100000)
        );

        if (isTouchDevice) {
            screenshot.setAttribute("class", hiddenClass);
            screenshot.addEventListener("touchend", function() {
                this.setAttribute("class", hiddenClass);
                if (this.webkitMatchesSelector(":last-child")) {
                    displayFirstScreenshot();
                }
                else {
                    this.nextSibling.removeAttribute("class");
                }
            });
        }
        else {
            screenshot.addEventListener('click', function () {
                window.location = imgUrl;
            });
        }
        
        screenshot.addEventListener("load", function () {
            createScreenshot(i + 1);
            if (i === 1) {
                document.body.setAttribute('id', 'launch');
                wrap.innerHTML = "";
            }
            wrap.appendChild(screenshot);
            if (i === 1) {
                displayFirstScreenshot();
            }
        });
    }

    createScreenshot(1);
}

function ready() {
    if (isTouchDevice && !navigator.standalone) {
        install();
    }
    else {
        launch();
    }
}

var isTouchDevice = (function() {
    var el = document.createElement('div');
    el.setAttribute('ongesturestart', 'return;');
    return typeof el.ongesturestart === "function";
//    return typeof 'ontouchstart' in window;
})();

window.addEventListener("load", ready);

})();
