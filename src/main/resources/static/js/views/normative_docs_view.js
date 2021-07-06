import {mainTemplate} from "./mainTemplate.js";
import {lft_wdth, rght_wdth, resizeSides} from "../general.js";
import {resizeMenuOptions} from "../header/menu.js";
import {getImageClassByExtension, getFileIcon} from "../general.js";
import {main_body_width, collapsedSideBarWidth} from "../general.js";

function normativeDocsDocs(name_for_id, list_url) {
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
            height: 96,
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
                var el_count = $$(name_for_id + '_docs_grid').count();
                if ( el_count === 0) {
                    $$(name_for_id + '_docs_grid').hide();
                } else {
                    var xCount = $$(name_for_id + '_docs_grid').config.xCount;
                    var rowCount = (el_count % xCount == 0) ? (el_count/xCount) : (1 + el_count/xCount);
                    var dataviewHeight = 100 * rowCount;
                    if ( $$(name_for_id + '_docs_grid').$height < dataviewHeight) {
                        $$(name_for_id + '_docs_grid').config.height = dataviewHeight;
                        $$(name_for_id + '_docs_grid').resize();
                    }
                }
            },
        }
    }
}

function normativeDocsForm(file_name_for_id, file_list_url) {
    return {
        id: 'normativeDocsFormId',
        borderless: true,
        rows: [
            {
                // view: 'label',
                id: 'normativeDocsHeaderId',
                template: 'Нормативные документы',
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
            normativeDocsDocs(file_name_for_id, file_list_url),
            {
                height: 100,
            }
        ]
    }
}

function smallNormativeForm(width) {
    let layout = webix.ui(mainTemplate);

    var xhr = webix.ajax().sync().get("/normative_docs_info");
    // var data = JSON.parse(xhr.responseText);
    webix.ui({
        id: 'content',
        // css: 'fond_bg2',
        // type:"space",
        view: 'scrollview',
        scroll: 'xy',
        // scroll: false,
        width: width,
        body: {
            margin: 10,
            cols: [
                normativeDocsForm('tab_file', 'normative_docs_files/'),
            ]
        }
    }, $$('content'));

    $$('htmlText').setHTML(xhr.responseText);

    webix.event(window, "resize", function (event) {
        layout.resize();
    });

    webix.attachEvent("onRotate", function(orientation){
        $$('content').config.width = document.body.clientWidth - collapsedSideBarWidth;
        $$('content').resize();
    });
}

function bigNormativeForm(width) {
    let layout = webix.ui(mainTemplate);

    var xhr = webix.ajax().sync().get("/normative_docs_info");
    // var data = JSON.parse(xhr.responseText);
    webix.ui({
        id: 'content',
        // css: 'fond_bg2',
        // type:"space",
        view: 'scrollview',
        scroll: 'xy',
        // scroll: false,
        width: width,
        body: {
            margin: 10,
            cols: [
                lft_wdth,
                normativeDocsForm('tab_file', 'normative_docs_files/'),
                rght_wdth,
            ]
        }
    }, $$('content'));

    $$('normativeDocsHeaderId').setHTML("Нормативные документы");
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

webix.ready(function() {
    if (document.body.clientWidth < main_body_width) {
        return smallNormativeForm(document.body.clientWidth - collapsedSideBarWidth);
    } else {
        return bigNormativeForm(main_body_width);
    }

})
