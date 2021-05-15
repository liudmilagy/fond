import {getImageClassByExtension} from "../general.js";

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

export function newsForm(file_name_for_id, file_list_url) {
    return {
        id: 'newsFormId',
        borderless: true,
        rows: [
        {
            view: 'label',
            id: 'newsHeaderId',
            css: 'product_label_main_title',
            borderless: true,
            align: 'center',
        },
        {
            cols: [
                {},
                // {
                //     id: 'imgCoverId',
                //     view: 'template',
                //     template: '<img src= #attachmentPath# class="content" style="background-repeat: no-repeat; background-position: center; background-size: cover"/></img>',
                //     width: 300,
                //     height: 225,
                // },
                {
                    id: 'imgCoverId',
                    view: 'photo',
                    name: 'photo',
                },
                {}
            ]
        },
        {
            view: 'template',
            id: 'htmlText',
            scroll: true,
            borderless: true,
            autoheight: true,
        },
        newsDocs(file_name_for_id, file_list_url),
        ]
    }
}