import {mainTemplate} from "./mainTemplate.js";
import {getOtherWidth, lft_wdth, rght_wdth, resizeSides} from "../general.js";
import {resizeMenuOptions} from "../header/menu.js";
import {newsList} from "../news/news_list.js";

webix.ready(function() {
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
            cols: [
                lft_wdth,
                newsList,
                rght_wdth,
            ]
        }
    }, $$('content'));

    webix.event(window, "resize", function (event) {
        resizeMenuOptions();
        resizeSides();
        layout.resize();
        // layout.define("width",document.body.clientWidth);
        // layout.define("height",window.innerHeight);
        // layout.resize();

    });

})
