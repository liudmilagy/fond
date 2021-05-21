import {getImageClassByExtension, getFileIcon} from "../../general.js";
import {main_body_width} from "../../general.js";

export function productDocs(name_for_id, list_url) {
    return {
        view: 'scrollview',
        // autowidth: true,
        // autoheight: true,
        id: 'productDocsTab',
        scroll: 'xy',
        // scroll: false,
        borderless: true,
        body: {
            cols: [
                // {width: getOtherWidth() + 100},
                // lft_wdth,
                {
                    rows: [
                        {
                            view: "dataview",
                            label: 'Прикрепленные файлы',
                            labelPosition: 'top',
                            id: name_for_id + '_docs_grid',
                            css: 'contacts',
                            borderless: true,
                            align: 'center',
                            scroll: 'false',
                            minWidth: 320,
                            minHeight: 200,
                            select: 1,
                            template: function (obj) {
                                // let imageClass = getImageClassByExtension(obj.fileExtension);
                                let docImg = "../../" + getFileIcon(obj.fileExtension);
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
                        },
                    ]
                },
                // {width: getOtherWidth() + 100},
                // rght_wdth,
            ]
        }
    }
}
