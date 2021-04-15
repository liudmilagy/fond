import {getOtherWidth, main_body_width} from "../general.js";

function getHeaderLabel(size) {
    return {
        borderless: true,
        rows: [
            {
                template: '<span style="font-size: larger; font-family:Montserrat, serif; font-weight: bolder;">Микрокредитная компания</span><br>' +
                    '<span style="font-size: larger; font-family:Montserrat, serif; font-weight: bolder;">Фонд поддержки малого предпринимательства Республики Бурятия</span><br>' +
                    '<span style="font-size: smaller; font-family:Montserrat, serif;">ОГРН 1020300978147, ИНН 0323072429, КПП 032301001</span><br>' +
                    '<span style="font-size: smaller; font-family:Montserrat, serif;">670000, Республика Бурятия, г. Улан-Удэ,ул. Партизанская 28</span>',
            }
        ]
    }
}

function getHeader(size) {
    var headerLabel = getHeaderLabel(size);

    return {
        borderless: true,
        cols: [
            { width: getOtherWidth()},
            {
                view: 'toolbar',
                id: 'headerId',
                height: size,
                width: main_body_width,
                borderless: true,
                elements: [
                    {
                        view: 'button',
                        type: 'image',
                        image: '../imgs/icon_my_business.webp',
                        width: size,
                        borderless: true,
                    },
                    {
                        view: 'button',
                        type: 'image',
                        image: '../imgs/icon_fond.webp',
                        width: size,
                        borderless: true,
                    },
                    headerLabel,
                ]
            },
            { width: getOtherWidth()},

        ]


    }
}

export const header = getHeader(100);