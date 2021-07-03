import {mainTemplate} from "./mainTemplate.js";
import {lft_wdth, rght_wdth, resizeSides} from "../general.js";
import {resizeMenuOptions} from "../header/menu.js";
import {getImageClassByExtension} from "../general.js";
import {map} from "../map/map.js";
import {main_body_width, collapsedSideBarWidth} from "../general.js";
import {getFileIcon} from "../general.js";

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
        minWidth: 320,
        minHeight: 200,
        template: function (obj) {
            // let imageClass = getImageClassByExtension(obj.fileExtension);
            let docImg = "../" + getFileIcon(obj.fileExtension);
            let downloadTime = obj.timeCreate.substr(0, 10)
            let result = "<div class='overall'>" +
                "<div>" +
                "<img style='position: absolute' src = " + docImg + "> " +
                "<div class='doc_title'>" + obj.originalFileName.slice(0, -4) + "</div>";
            result += "<div class='doc_time_create'>" + downloadTime + "</div>" +
                "<div class='download_docs'>" +
                "<a style='text-decoration: none; color: #1ca1c1' href=" + obj.attachmentPath + " download>Скачать файл</a>" +
                "</div>" +
                "</div>" +
                "</div>"
            return result;
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
                if (document.body.clientWidth < main_body_width) {
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
                view: 'template',
                id: 'contactsHeaderId',
                css: 'other_tab_main_title',
                borderless: true,
                align: 'center',
                autoheight: true,
            },
            {
                view: 'template',
                id: 'htmlText',
                scroll: false,
                borderless: true,
                autoheight: true,
            },
            contactsDocs(file_name_for_id, file_list_url),
            map(),
        ]
    }
}

function bigContactsForm() {
    let layout = webix.ui(mainTemplate);

    var xhr = webix.ajax().sync().get("/contacts_info");
    // var data = JSON.parse(xhr.responseText);
    webix.ui({
        id: 'content',
        // css: 'fond_bg2',
        // type:"space",
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

    $$('contactsHeaderId').setHTML("Контакты");
    $$('htmlText').setHTML(xhr.responseText);

    webix.event(window, "resize", function (event) {
        resizeMenuOptions();
        resizeSides();
        layout.resize();
        // layout.define("width",document.body.clientWidth);
        // layout.define("height",window.innerHeight);
        // layout.resize();

    });
}

function smallContactsForm() {
    let layout = webix.ui(mainTemplate);

    var xhr = webix.ajax().sync().get("/contacts_info");
    // var data = JSON.parse(xhr.responseText);
    webix.ui({
        id: 'content',
        // css: 'fond_bg2',
        // type:"space",
        view: 'scrollview',
        scroll: 'xy',
        // scroll: false,
        body: {
            margin: 10,
            cols: [
                contactsForm('tab_file', 'contacts_files/'),
            ]
        }
    }, $$('content'));

    $$('contactsHeaderId').setHTML("Контакты");
    $$('htmlText').setHTML(xhr.responseText);

    webix.event(window, "resize", function (event) {
        layout.resize();

    });
}

webix.ready(function() {
    if (document.body.clientWidth < main_body_width) {
        return smallContactsForm();
    } else {
        return bigContactsForm();
    }

})
