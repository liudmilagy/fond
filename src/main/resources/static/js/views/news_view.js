import {mainTemplate} from "./mainTemplate.js";
import {lft_wdth, rght_wdth, resizeSides} from "../general.js";
import {resizeMenuOptions} from "../header/menu.js";
import {newsForm} from "../news/news_form.js";

webix.ready(function() {
    let layout = webix.ui(mainTemplate);

    var params = {
        'hash_id': HASH_ID
    }
    var xhr = webix.ajax().sync().get("/news_dto", params);
    var data = JSON.parse(xhr.responseText);
    webix.ui({
        id: 'content',
        css: 'fond_bg2',
        type:"space",
        view: 'scrollview',
        scroll: 'xy',
        // scroll: false,
        body: {
            margin: 10,
            cols: [
                lft_wdth,
                newsForm('news_file', 'news_files/' + HASH_ID),
                rght_wdth,
            ]
        }
    }, $$('content'));

    $$('newsHeaderId').setValue(data.heading);
    $$('htmlText').setHTML(data.htmlText);
    $$('imgCoverId').parse(data);

    webix.event(window, "resize", function (event) {
        resizeMenuOptions();
        resizeSides();
        layout.resize();
        // layout.define("width",document.body.clientWidth);
        // layout.define("height",window.innerHeight);
        // layout.resize();

    });

})
