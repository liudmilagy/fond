import {mainTemplate} from "./mainTemplate.js";
import {getOtherWidth, lft_wdth, rght_wdth, resizeSides} from "../general.js";
import {resizeMenuOptions} from "../header/menu.js";
import {newsForm, generateNewsTemplate} from "../news/news_form.js";

webix.ready(function() {
    let layout = webix.ui(mainTemplate);

    var params = {
        'hash_id': HASH_ID
    }
    var xhr = webix.ajax().sync().get("cls_news", params);
    var data = JSON.parse(xhr.responseText);
    // $$('newsFormId').parse(data);

    var newsTemplate = generateNewsTemplate(data)
    // webix.ui(newsForm, $$('archiveNewsId'));
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
                newsForm,
                rght_wdth,
            ]
        }
    }, $$('content'));

    $$('newsFormTemplateId').parse({
        'newsTemplate': newsTemplate
    });
    webix.event(window, "resize", function (event) {
        resizeMenuOptions();
        resizeSides();
        layout.resize();
        // layout.define("width",document.body.clientWidth);
        // layout.define("height",window.innerHeight);
        // layout.resize();

    });

})
