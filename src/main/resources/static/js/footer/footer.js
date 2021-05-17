import {main_body_width, getOtherWidth, collapsedSideBarWidth} from "../general.js";

var footerElements = [
    {
        css: 'fond_footer',
        borderless: true,
        template: '<span style="font-family:Montserrat, serif; font-weight: bolder;">Микрокредитная компания</span><br>' +
            '<span style="font-family:Montserrat, serif; font-weight: bolder;">Фонд поддержки малого предпринимательства Республики Бурятия</span><br>' +
            '<span style="font-size: smaller; font-family:Montserrat, serif;">ОГРН 1020300978147, ИНН 0323072429, КПП 032301001</span><br>'
    },
    {
        css: 'fond_footer',
        borderless: true,
        template:
            '<span style="font-size: smaller;font-family:Montserrat, serif; ">Понедельник - Пятница с 9:00 до 18:00</span><br>' +
            '<span style="font-size: smaller;font-family:Montserrat, serif; ">Обед 12:00 - 13:00</span><br>' +
            '<span style="font-size: smaller; font-family:Montserrat, serif;">Сб, Вс - выходной</span><br>'
    },
    {
        css: 'fond_footer',
        borderless: true,
        template:
            '<span style="font-size: smaller;font-family:Montserrat, serif; ">670000, Республика Бурятия, г. Улан-Удэ, ул. Партизанская 28</span><br>' +
            '<span style="font-size: smaller;font-family:Montserrat, serif; ">Тел. +7 (3012) 48-08-08</span><br>' +
            '<span style="font-size: smaller; font-family:Montserrat, serif;">е-mail: fond03@mail.ru</span><br>'
    },
]

function footerForm(isBigForm) {
    if (isBigForm) {
        return {
            cols: footerElements
        }
    } else {
        return {
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
        minHeight: 100,
        width: width,
        css: 'fond_bg',
        borderless: true,
        rows: [
            footerCols
        ]
    }
}

