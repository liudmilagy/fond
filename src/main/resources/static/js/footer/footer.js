import {main_body_width, getOtherWidth} from "../general.js";

const footerForm = {
    cols: [
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

}

export const footer =
{
    view: 'toolbar',
    // id: 'footerId',
    height: 100,
    width: main_body_width,
    css: 'fond_bg',
    borderless: true,
    rows: [
        {
            cols: [
                { width: getOtherWidth()},
                footerForm,
                { width: getOtherWidth()},
            ]
        }
    ]
}
