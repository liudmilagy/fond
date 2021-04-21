import {getOtherWidth, getImageClassByExtension} from "../../general.js";

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
                {width: getOtherWidth() + 100},
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
                            // scroll: 'y',
                            scroll: false,
                            // maxWidth: 600,
                            // minHeight: 200,
                            select: 1,
                            // template: function (obj) {
                            //     let docImg = getFileIcon(obj.fileExtension);
                            //     let result = "<div class='overall'>" +
                            //         "<div>" +
                            //         "<img style='position: absolute' src = " + docImg + "> " +
                            //         "<div class='doc_title'>" + obj.originalFileName.slice(0, -4) + "</div>" +
                            //         "<div class='download_docs'>" +
                            //         "<a style='text-decoration: none; color: #1ca1c1' href=uploads/" + obj.fileName + obj.fileExtension + " download>Скачать файл</a>" +
                            //         "</div>" +
                            //         "</div>" +
                            //         "</div>"
                            //     return result;
                            // },
                            template: function (obj) {
                                let imageClass = getImageClassByExtension(obj.fileExtension);
                                return '<div class="'+ imageClass + '" style="font-size: x-large"></div>' +"<a style='text-decoration: none; color: #1ca1c1' href=uploads/" + obj.fileName + obj.fileExtension  + " download>" + obj.originalFileName + "</a>";
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
                {width: getOtherWidth() + 100},
            ]
        }
    }
}
