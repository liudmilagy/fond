import {getImageClassByExtension} from "../../general.js";
import {main_body_width} from "../../general.js";

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
                            scroll: false,
                            select: 1,
                            template: function (obj) {
                                let imageClass = getImageClassByExtension(obj.fileExtension);
                                return '<div class="'+ imageClass + '" style="font-size: xx-large;"></div>' +
                                    '<a style="text-decoration: none; color: #1ca1c1; vertical-align: central" href=uploads/' + obj.fileName + obj.fileExtension  + ' download>' + obj.originalFileName + '</a>';
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
