import {mainTemplate} from "./mainTemplate.js";
import {getOtherWidth, main_body_width} from "../general.js";
import {resizeMenuOptions} from "../header/menu.js";
import {productList} from "../product_line/menu_page/product_list.js";

function bigProductListPage() {
    let layout = webix.ui(mainTemplate);
    let otherWidth = getOtherWidth();
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
                {width: otherWidth},
                productList,
                {width: otherWidth},
            ]
        }
    }, $$('content'));

    webix.event(window, "resize", function (event) {
        resizeMenuOptions();
        otherWidth = getOtherWidth();
        layout.resize();
        // layout.define("width",document.body.clientWidth);
        // layout.define("height",window.innerHeight);
        // layout.resize();

    });
}

function smallProductListPage() {
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
                productList,
            ]
        }
    }, $$('content'));
}

webix.ready(function() {

    if (document.body.clientWidth < main_body_width) {
        return smallProductListPage();
    } else {
        return bigProductListPage();
    }

})
