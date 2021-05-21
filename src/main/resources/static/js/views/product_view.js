import {mainTemplate} from "./mainTemplate.js";
import {getOtherWidth, main_body_width} from "../general.js";
import {resizeMenuOptions} from "../header/menu.js";
import {productDataForm} from "../product_line/menu_page/product_data_form.js";
import {lft_wdth, resizeSides, rght_wdth} from "../general.js";

function bigProductView() {
    let layout = webix.ui(mainTemplate);

    var params = {
        'productId': ID
    }
    var xhr = webix.ajax().sync().get("cls_product", params);
    var data = JSON.parse(xhr.responseText);
    webix.ui({
        id: 'content',
        css: 'fond_bg2',
        type:"space",
        view: 'scrollview',
        scroll: false,
        borderless: true,
        body: {
            // padding: 20,
            margin: 10,
            borderless: true,
            cols: [
                lft_wdth,
                productDataForm('productInfoTab', data.id, data.name, true),
                rght_wdth,
            ]
        }
    }, $$('content'));

    $$('labelId').setValue(data.name);
    $$('textHtmlId').setHTML(data.htmlText);

    webix.event(window, "resize", function (event) {
        resizeMenuOptions();
        resizeSides();
        layout.resize();
        // layout.define("width",document.body.clientWidth);
        // layout.define("height",window.innerHeight);
        // layout.resize();

    });
}

function smallProductView() {
    let layout = webix.ui(mainTemplate);

    var params = {
        'productId': ID
    }
    var xhr = webix.ajax().sync().get("cls_product", params);
    var data = JSON.parse(xhr.responseText);
    webix.ui({
        id: 'content',
        css: 'fond_bg2',
        type:"space",
        view: 'scrollview',
        scroll: false,
        borderless: true,
        body: {
            // padding: 20,
            margin: 10,
            borderless: true,
            cols: [
                productDataForm('productInfoTab', data.id, data.name, false),
            ]
        }
    }, $$('content'));

    $$('productLabelId').resize();
    $$('labelId').setValue(data.name);
    $$('textHtmlId').setHTML(data.htmlText);

    webix.event(window, "resize", function (event) {
        layout.resize();
        // layout.define("width",document.body.clientWidth);
        // layout.define("height",window.innerHeight);
        // layout.resize();

    });
}

webix.ready(function() {
    if (document.body.clientWidth < main_body_width) {
        return smallProductView();
    } else {
        return bigProductView();
    }
})
