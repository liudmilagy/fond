import {main_body_width, getOtherWidth} from "../general.js";

export const menu = {
    view: 'toolbar',
    css: 'fond_bg',
    height: 40,
    borderless: true,
    cols: [
        {width: getOtherWidth()},
        {
            view: 'menu',
            id: 'menuId',
            layout: 'x',
            css: 'fond',
            autowidth: true,
            data: [
                {
                    id: "1", value: "Главная",
                },
                {
                    id: "2", value: "О Фонде",
                    submenu: ["Информация о фонде", "Нормативные документы", "Реквизиты"]
                },
                {
                    id: "3", value: "Продуктовая линейка",
                },
                {
                    id: "4", value: "Записаться",
                },
                {
                    id: "5", value: "Новости",
                },
                {
                    id: "6", value: "Контакты",
                },
            ],
            type: {
                subsign: true,
                width: getMenuWidth(),
                height: 40,
            },
        },
        {width: getOtherWidth()},
    ]
}

export function resizeMenuOptions(){
    const menu = $$('menuId');
    menu.customize({
        width: menu.$width / 6
    });
    menu.refresh();
}

function getMenuWidth() {
    if (document.body.clientWidth < main_body_width) {
        return document.body.clientWidth/6;
    } else {
        return main_body_width/6;
    }
}

