import {productLine} from "/js/product_line.js";
import {menu} from "./header/menu.js";
import {header} from "./header/toolbar.js";
import {view_header} from "./general.js";
import {resizeMenuOptions} from "./header/menu.js";

function getClientWidth() {
    return document.body.clientWidth;
}

function img(obj){
    return '<img src="'+obj.src+'" class="content" ondragstart="return false"/>'
}

const mainTemplate = {
    rows: [
        // mainHeader,
        header,
        menu,
        // {
        //     id: 'content',
        // },
        {
            view: 'scrollview',
            scroll: 'xy',
            body: {
                padding: 20,
                rows: [
                    {id: 'content'}
                ]
            }
        }
    ]
}

webix.ready(function() {
    // let layout = webix.ui(createProductLine());
    let layout = webix.ui(mainTemplate);
    webix.ui({
        id: 'content',
        rows: [
            // carousel,
            productLine,
        ]
    }, $$('content'));

    webix.event(window, "resize", function (event) {
        resizeMenuOptions();
        layout.resize();
        // layout.define("width",document.body.clientWidth);
        // layout.define("height",window.innerHeight);
        // layout.resize();

    });

})
