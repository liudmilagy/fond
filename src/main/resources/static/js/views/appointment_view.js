import {mainTemplate} from "./mainTemplate.js";
import {getOtherWidth, lft_wdth, rght_wdth, resizeSides} from "../general.js";
import {resizeMenuOptions} from "../header/menu.js";
import {appointment} from "../appointment/appointment_main.js";


webix.ready(function() {
    let layout = webix.ui(mainTemplate);
    if ($$('appointmentId')) {
        $$('appointmentId').destructor();
    }
    webix.ui({
        id: 'content',
        css: 'fond_bg2',
        type:"space",
        view: 'scrollview',
        scroll: 'false',
        body: {
            // padding: 20,
            margin: 10,
            rows: [
                appointment
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
