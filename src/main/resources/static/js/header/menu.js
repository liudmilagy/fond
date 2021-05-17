import {main_body_width} from "../general.js";

export const menu = {
    view: 'menu',
    id: 'menuId',
    layout: 'x',
    css: 'fond',
    autowidth: true,
    data: [
        {
            id: "2", value: "О Фонде",
            submenu: [
                {id: 'aboutFond', value: "Информация о фонде"},
                {id: 'normDocs', value: 'Нормативные документы'}
                ]
        },
        {
            id: "ProductList", value: "Продуктовая линейка",
        },
        {
            id: "Appointment", value: "Записаться",
        },
        {
            id: "News", value: "Новости",
        },
        {
            id: "Contacts", value: "Контакты",
        },
    ],
    type: {
        subsign: true,
        width: getMenuWidth(),
        height: 40,
    },
    on: {
        onMenuItemClick: function (id) {
            if (id == 'Appointment') {
                window.location.href = "/appointment";
            }
            if (id == 'ProductList') {
                window.location.href = "/product_list";
            }
            if (id == 'News') {
                window.location.href = "/news_list";
            }
            if (id == 'aboutFond') {
                window.location.href = "/about_fond";
            }
            if (id == 'normDocs') {
                window.location.href = "/documents";
            }
            if (id == 'Contacts') {
                window.location.href = "/contacts";
            }
        }
    }
}

export function resizeMenuOptions(){
    const menu = $$('menuId');
    menu.customize({
        width: menu.$width / 5
    });
    menu.refresh();
}

function getMenuWidth() {
    if (document.body.clientWidth < main_body_width) {
        return document.body.clientWidth/5;
    } else {
        return (main_body_width - 5)/5;
    }
}

