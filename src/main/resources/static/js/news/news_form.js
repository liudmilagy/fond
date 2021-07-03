import {getImageClassByExtension, getFileIcon} from "../general.js";
import {main_body_width} from "../general.js";

export function newsDocs(name_for_id, list_url) {
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

function bigNewsForm(file_name_for_id, file_list_url) {
    return {
        id: 'newsFormId',
        borderless: true,
        rows: [
            {
                view: 'template',
                id: 'newsHeaderId',
                template: "#heading#",
                css: 'product_label_main_title',
                borderless: true,
                align: 'center',
                autoheight: true,
            },
            {
                cols: [
                    // {},
                    {
                        id: 'imgCoverId',
                        view: 'template',
                        borderless: true,
                        template: '<img width="300" src= #attachmentPath# style="background-repeat: no-repeat; background-position: center; background-size: cover"/>',
                        width: 300,
                        height: 225,
                    },
                    {
                        rows: [
                            {
                                view: 'template',
                                id: 'htmlText',
                                scroll: false,
                                borderless: true,
                                autoheight: true,
                            },
                            newsDocs(file_name_for_id, file_list_url),
                            {}
                        ]
                    }

                ]
            },
        ]
    }
}

function smallNewsForm(file_name_for_id, file_list_url) {
    return {
        id: 'newsFormId',
        borderless: true,
        rows: [
            {
                // view: 'label',
                view: 'template',
                template: "#heading#",
                id: 'newsHeaderId',
                css: 'product_label_main_title',
                borderless: true,
                align: 'center',
                autoheight: true,
            },
            {
                id: 'imgCoverId',
                view: 'template',
                borderless: true,
                template: '<img width="300" src= #attachmentPath# style="background-repeat: no-repeat; background-position: center; background-size: cover"/>',
                width: 300,
                height: 225,
            },
            {
                view: 'template',
                id: 'htmlText',
                scroll: false,
                borderless: true,
                autoheight: true,
            },
            newsDocs(file_name_for_id, file_list_url),
        ]
    }
}

export function newsForm(file_name_for_id, file_list_url, isBigForm) {
    if (isBigForm) {
        return bigNewsForm(file_name_for_id, file_list_url);
    } else {
        return smallNewsForm(file_name_for_id, file_list_url);
    }
}
