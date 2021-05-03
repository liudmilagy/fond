import {main_body_width, getOtherWidth, changeContentView} from "../general.js";
import {appointment} from "../appointment/appointment_main.js";
import {productList} from "../product_line/menu_page/product_list.js";
import {about_fond} from "../about_fond/about_fond.js";
import {main_page} from "../main/main_page.js";

export const menu = {
    // view: 'toolbar',
    // css: 'fond_bg',
    // height: 40,
    // borderless: true,
    cols: [
        {width: getOtherWidth()},
        {
            view: 'menu',
            id: 'menuId',
            layout: 'x',
            css: 'fond',
            autowidth: true,
            data: [
                // {
                //     id: "Main", value: "Главная",
                // },
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
                        view = productList;
                        if ($$('productListId')) {
                            $$('productListId').destructor();
                        }
                    }
                    if (id == 'aboutFond') {
                        view = about_fond;
                    }
                    if (id == 'Main') {
                        view = main_page;
                    }
                    // changeContentView(view);
                    if (view != null) {
                        changeContentView(view);
                    }
                }
            }
        },
        {width: getOtherWidth()},
    ]
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

