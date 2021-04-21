import {getOtherWidth} from "../../general.js";

function getFileIcon(fileExtension) {
    let docImg;
    switch (fileExtension) {
        case '.zip':
            docImg = 'zip.png';
            break;
        case '.pdf':
            docImg = 'pdf.png';
            break;
        case '.jpeg':
            docImg = 'jpg.png';
            break;
        case '.jpg':
            docImg = 'jpg.png';
            break;
        case '.doc':
            docImg = 'doc.png';
            break;
        case '.docx':
            docImg = 'doc.png';
            break;
        default:
            docImg = 'file.png';
            break;
    }
    return docImg;
}

export function productDocs(name_for_id, list_url) {
    return {
        view: 'scrollview',
        // autowidth: true,
        // autoheight: true,
        id: 'productDocsTab',
        scroll: 'xy',
        body: {
            cols: [
                {width: getOtherWidth()},
                {
                    rows: [
                        {
                            view: "dataview",
                            label: 'Прикрепленные файлы',
                            labelPosition: 'top',
                            id: name_for_id + '_docs_grid',
                            css: 'contacts',
                            scroll: 'y',
                            minWidth: 320,
                            minHeight: 200,
                            select: 1,
                            template: function (obj) {
                                let docImg = getFileIcon(obj.fileExtension);
                                let downloadTime = obj.timeCreate.substr(11, 8) + ', ' + obj.timeCreate.substr(0, 10)
                                let result = "<div class='overall'>" +
                                    "<div>" +
                                    "<img style='position: absolute' src = " + docImg + "> " +
                                    "<div class='doc_title'>" + obj.originalFileName.slice(0, -4) + "</div>";
                                result += "<div id='del_button' style='position: absolute;top: 0; right: 5px;' onclick='delete_file(" + obj.id + ", \"" + name_for_id + "\")' class='mdi mdi-close-thick'></div>"
                                result += "<div class='doc_time_create'>" + downloadTime + "</div>" +
                                    "<div class='download_docs'>" +
                                    "<a style='text-decoration: none; color: #1ca1c1' href=uploads/" + obj.fileName + obj.fileExtension + " download>Скачать файл</a>" +
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
                        },
                    ]
                },
                {width: getOtherWidth()},
            ]
        }
    }
}
