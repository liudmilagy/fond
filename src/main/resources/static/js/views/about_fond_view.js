import {mainTemplate} from "./mainTemplate.js";
import {lft_wdth, rght_wdth, resizeSides} from "../general.js";
import {resizeMenuOptions} from "../header/menu.js";
import {getImageClassByExtension, main_body_width, collapsedSideBarWidth} from "../general.js";

function aboutFondDocs(name_for_id, list_url) {
    return  {
        view: "dataview",
        label: 'Прикрепленные файлы',
        labelPosition: 'top',
        id: name_for_id + '_docs_grid',
        css: 'contacts',
        borderless: true,
        align: 'center',
        scroll: false,
        select: 1,
        template: function (obj) {
            let imageClass = getImageClassByExtension(obj.fileExtension);
            return '<div class="'+ imageClass + '" style="font-size: xx-large;"></div>' +
                '<a style="text-decoration: none; color: #1ca1c1; vertical-align: central" href=' + obj.attachmentPath  + ' download>' + obj.originalFileName + '</a>';
        },
        url: list_url,
        xCount: 2,
        type: {
            height: "auto",
            width: "auto",
            float: "right"
        },
        scheme: {},
        on: {
            onBeforeLoad: () => {
                if (document.body.clientWidth < 980) {
                    $$(name_for_id + '_docs_grid').config.xCount = 1;
                }
            },
            onAfterLoad: () => {
                if ($$(name_for_id + '_docs_grid').count() === 0) {
                    $$(name_for_id + '_docs_grid').hide();
                }
            },
        }
    }
}

function aboutFondForm(file_name_for_id, file_list_url) {
    return {
        id: 'aboutFondFormId',
        borderless: true,
        rows: [
            {
                view: 'label',
                id: 'aboutFondHeaderId',
                css: 'product_label_main_title',
                borderless: true,
                align: 'center',
            },
            {
                view: 'template',
                id: 'htmlText',
                scroll: false,
                borderless: true,
                autoheight: true,
            },
            aboutFondDocs(file_name_for_id, file_list_url),
        ]
    }
}

function bigAboutFond(width) {
    let layout = webix.ui(mainTemplate);
    var xhr = webix.ajax().sync().get("/about_fond_info");
    webix.ui({
        id: 'content',
        css: 'fond_bg2',
        type:"space",
        view: 'scrollview',
        width: width,
        scroll: 'xy',
        // scroll: false,
        body: {
            margin: 10,
            cols: [
                lft_wdth,
                aboutFondForm('tab_file', 'about_fond_files/'),
                rght_wdth,
            ]
        }
    }, $$('content'));

    $$('aboutFondHeaderId').setValue("О фонде");
    $$('htmlText').setHTML(xhr.responseText);

    webix.event(window, "resize", function (event) {
        resizeMenuOptions();
        resizeSides();
        layout.resize();
    });
}

function smallAboutFond(width) {
    let layout = webix.ui(mainTemplate);
    var xhr = webix.ajax().sync().get("/about_fond_info");
    webix.ui({
        id: 'content',
        css: 'fond_bg2',
        // type:"space",
        view: 'scrollview',
        width: width,
        scroll: 'xy',
        body: {
            rows: [
                aboutFondForm('tab_file', 'about_fond_files/'),
            ]
        }
    }, $$('content'));

    $$('aboutFondHeaderId').setValue("О фонде");
    $$('htmlText').setHTML(xhr.responseText);
}

webix.ready(function() {
    if (document.body.clientWidth < main_body_width) {
        return smallAboutFond(document.body.clientWidth - collapsedSideBarWidth);
    } else {
        return bigAboutFond(main_body_width);
    }

})
