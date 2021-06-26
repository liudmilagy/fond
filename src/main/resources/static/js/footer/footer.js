import {main_body_width, getOtherWidth, collapsedSideBarWidth} from "../general.js";

var footerElements = [
    {
        css: 'fond_footer',
        height: 110,
        borderless: true,
        template: '<span style="font-weight: bolder;">Микрокредитная компания</span><br>' +
            '<span style="font-weight: bolder;">Фонд поддержки малого предпринимательства Республики Бурятия</span><br>' +
            '<span style="font-size: smaller; ">ОГРН 1020300978147, ИНН 0323072429, КПП 032301001</span><br>'
    },
    {
        css: 'fond_footer',
        height:70,
        borderless: true,
        template:
            '<span style="font-size: smaller;">Понедельник - Пятница с 9:00 до 18:00</span><br>' +
            '<span style="font-size: smaller;">Обед 12:00 - 13:00</span><br>' +
            '<span style="font-size: smaller;">Сб, Вс - выходной</span><br>'
    },
    {
        css: 'fond_footer',
        height: 70,
        borderless: true,
        template:
            '<span style="font-size: smaller;">670000, Республика Бурятия, г. Улан-Удэ, ул. Партизанская 28</span><br>' +
            '<span style="font-size: smaller;">Тел. +7 (3012) 48-08-08</span><br>' +
            '<span style="font-size: smaller;">е-mail: fond03@mail.ru</span><br>'
    },
]

function footerForm(isBigForm) {
    if (isBigForm) {
        return {
            cols: footerElements
        }
    } else {
        return {
            height: 250,
            rows: footerElements
        }
    }
}

export function footer() {
    var width = main_body_width;
    var footerCols = {
        cols: [
            {
                id: 'leftFooterId',
                width: getOtherWidth(),
            },
            footerForm(true),
            {
                id: 'rightFooterId',
                width: getOtherWidth()
            },
        ]
    }

    if (document.body.clientWidth < main_body_width) {
        width = document.body.clientWidth - collapsedSideBarWidth;
        footerCols = {cols: [footerForm(false)]}
    }


   return  {
        view: 'toolbar',
            // id: 'footerId',
        // minHeight: 100,
        width: width,
        css: 'fond_bg',
        borderless: true,
        rows: [
            footerCols
        ]
    }
}

