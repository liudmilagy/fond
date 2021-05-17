import {mainTemplate} from "./mainTemplate.js";
import {lft_wdth, rght_wdth, resizeSides} from "../general.js";
import {resizeMenuOptions} from "../header/menu.js";
import {getImageClassByExtension} from "../general.js";

function contactsDocs(name_for_id, list_url) {
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

function contactsForm(file_name_for_id, file_list_url) {
    return {
        id: 'contactsFormId',
        borderless: true,
        rows: [
            {
                view: 'label',
                id: 'contactsHeaderId',
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
            contactsDocs(file_name_for_id, file_list_url),
        ]
    }
}

webix.ready(function() {
    let layout = webix.ui(mainTemplate);

    var xhr = webix.ajax().sync().get("/contacts_info");
    // var data = JSON.parse(xhr.responseText);
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
                contactsForm('tab_file', 'contacts_files/'),
                rght_wdth,
            ]
        }
    }, $$('content'));

    $$('contactsHeaderId').setValue("Контакты");
    $$('htmlText').setHTML(xhr.responseText);

    webix.event(window, "resize", function (event) {
        resizeMenuOptions();
        resizeSides();
        layout.resize();
        // layout.define("width",document.body.clientWidth);
        // layout.define("height",window.innerHeight);
        // layout.resize();

    });

})
