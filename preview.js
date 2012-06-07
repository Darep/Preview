
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

                var start_x = 0;
                var start_y = 0;
                var delta_x = 0;
                var delta_y = 0;
                
                screenshot.addEventListener("touchstart", function (event) {
                    start_x = event.touches[0].pageX;
                    start_y = event.touches[0].pageY;
                    delta_x = 0;
                    delta_y = 0;
                });

                screenshot.addEventListener("touchmove", function (event) {
                    delta_x = Math.abs(event.touches[0].pageX - start_x);
                    delta_y = Math.abs(event.touches[0].pageY - start_y);
                });

                screenshot.addEventListener("touchend", function (event) {
                    if (delta_x > 10 || delta_y > 10) {
                        return;
                    }

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
                window.scrollTo(0, 1);
            });
        }

        createScreenshot(1);
    }

    function ready() {
        if (isTouchDevice && !navigator.standalone) {
            //install();
            launch();
        }
        else {
            launch();
        }
    }

    var isTouchDevice = (function() {
        var el = document.createElement('div');
        el.setAttribute('ontouchstart', 'return;');
        return typeof el.ontouchstart === "function";
    //    return typeof 'ontouchstart' in window;
    })();

    window.addEventListener("load", ready);

})();
