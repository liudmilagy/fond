import {mainTemplate} from "./mainTemplate.js";
import {getOtherWidth} from "../general.js";
import {resizeMenuOptions} from "../header/menu.js";
import {productDataForm} from "../product_line/menu_page/product_data_form.js";

webix.ready(function() {
    let layout = webix.ui(mainTemplate);
    let otherWidth = getOtherWidth();

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
        scroll: 'xy',
        body: {
            // padding: 20,
            margin: 10,
            borderless: true,
            cols: [
                {width: otherWidth},
                productDataForm('productInfoTab', data.id, data.name),
                {width: otherWidth},
            ]
        }
    }, $$('content'));

    $$('labelId').setValue(data.name);
    $$('textHtmlId').setHTML(data.htmlText);

    webix.event(window, "resize", function (event) {
        resizeMenuOptions();
        otherWidth = getOtherWidth();
        layout.resize();
        // layout.define("width",document.body.clientWidth);
        // layout.define("height",window.innerHeight);
        // layout.resize();

    });

})
