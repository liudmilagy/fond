import {getOtherWidth} from "./general.js";

webix.i18n.setLocale("ru-RU");

import {productLine} from "/js/product_line/main_page/product_line.js";
import {menu} from "./header/menu.js";
import {header} from "./header/toolbar.js";
import {view_header} from "./general.js";
import {resizeMenuOptions} from "./header/menu.js";
import {carousel} from "./header/carousel.js";
import {calculator} from "./calculator/calculator.js";
import {map} from "./map/map.js"
import {footer} from "./footer/footer.js";

function getClientWidth() {
    return document.body.clientWidth;
}

const mainTemplate = {
    rows: [
        // mainHeader,
        header,
        menu,
        {
            id: 'content',
        },
    ]
}

webix.ready(function() {
    // let layout = webix.ui(createProductLine());
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
                {
                    cols: [
                        { width: getOtherWidth()},
                        {
                            rows: [
                                // carousel,
                                productLine(),
                                {},
                                calculator(),
                                {},
                                {},
                                map(),
                                {},
                            ]
                        },
                        { width: getOtherWidth()},
                    ],
                },
                footer
            ]
        }
    }, $$('content'));

    webix.event(window, "resize", function (event) {
        // resizeMenuOptions();
        layout.resize();
        // layout.define("width",document.body.clientWidth);
        // layout.define("height",window.innerHeight);
        // layout.resize();

    });

})
