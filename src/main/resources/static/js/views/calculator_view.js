import {mainTemplate} from "./mainTemplate.js";
import {getOtherWidth, lft_wdth, rght_wdth, resizeSides, main_body_width} from "../general.js";
import {resizeMenuOptions} from "../header/menu.js";
import {calculator_with_schedule} from "../calculator/calculator_with_schedule.js";


webix.ready(function() {
    var isBigForm = true
    if (document.body.clientWidth < main_body_width) {
        isBigForm = false;
    }

    let layout = webix.ui(mainTemplate);
    webix.ui({
        id: 'content',
        css: 'fond_bg2',
        type:"space",
        view: 'scrollview',
        scroll: 'xy',
        body: {
            // padding: 20,
            margin: 10,
            rows: [
                calculator_with_schedule(isBigForm)
            ]
        }
    }, $$('content'));

    webix.event(window, "resize", function (event) {
        resizeMenuOptions();
        // resizeSides();
        layout.resize();
        // layout.define("width",document.body.clientWidth);
        // layout.define("height",window.innerHeight);
        // layout.resize();

    });

})
