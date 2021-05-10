import {main_body_width, changeContentView} from "../general.js";
import {appointment} from "../appointment/appointment_main.js";
import {about_fond} from "../about_fond/about_fond.js";

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
            id: "6", value: "Контакты",
        },
    ],
    type: {
        subsign: true,
        width: getMenuWidth(),
        height: 40,
    },
    on: {
        onMenuItemClick: function (id) {
            let view;
            if (id == 'Appointment') {
                view = appointment;
                if ($$('appointmentId')) {
                    $$('appointmentId').destructor();
                }
            }
            if (id == 'ProductList') {
                window.location.href = "/product_list";
            }
            if (id == 'News') {
                window.location.href = "/news";
            }
            if (id == 'aboutFond') {
                view = about_fond;
            }
            // changeContentView(view);
            if (view != null) {
                changeContentView(view);
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
        return main_body_width/5;
    }
}

