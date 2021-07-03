import {main_body_width} from "../general.js";

var menuData = [
    {
        id: 'Main', value: 'Главная',
    },
    {
        id: "2", value: "О Фонде",
        submenu: [
            {id: 'aboutFond',value: "Информация о фонде"},
            {id: 'antiCorruption', value: 'О противодействии коррупции'},
            {id: 'normDocs', value: 'Нормативные документы'},
            {id: 'infoDisclosure', value: 'Раскрытие информации'}
        ]
    },
    {
        id: "ProductList", value: "Продуктовая линейка",
    },
    {
        id: "4", value: "Предпринимателям",
        submenu: [
            {id: 'termsOfProvidingMicroloans',value: "Правила предоставления микрозаймов"},
            {id: 'documents',value: "Документы",
                submenu: [
                    {id: 'documentsIP', value: "Перечень ИП"},
                    {id: 'documentsUL', value: "Перечень ЮЛ"}
                ]},
            {id: "ProductList_", value: "Продуктовая линейка"},
            {id: "Calculator", value: "Калькулятор"},
        ]
    },
    {
        id: "Appointment", value: "Записаться",
    },
    {
        id: "News", value: "Новости",
    },
    {
        id: "Requisites", value: "Реквизиты",
    },
    {
        id: "Contacts", value: "Контакты",
    },
];

var sideBarData = [
    {
        id: 'Main', icon: 'fas fa-home', value: 'Главная',
    },
    {
        id: 'About', icon: 'fas fa-info-circle', value: "О Фонде",
        data: [
            {id: 'aboutFond', value: "Информация о фонде"},
            {id: 'antiCorruption', value: 'О противодействии коррупции'},
            {id: 'normDocs',  value: 'Нормативные документы'},
            {id: 'infoDisclosure', value: 'Раскрытие информации'}
        ]
    },
    {
        id: "ProductList", icon: 'fas fa-briefcase', value: 'Продуктовая линейка',
    },
    {
        id: "4", icon: 'fas fa-user-tie', value: "Предпринимателям",
        data: [
            {id: 'termsOfProvidingMicroloans',value: "Правила предоставления микрозаймов"},
            {id: 'documents',value: "Документы",
                data: [
                    {id: 'documentsIP', value: "Перечень ИП"},
                    {id: 'documentsUL', value: "Перечень ЮЛ"}
                ]},
            {id: "ProductList_", value: "Продуктовая линейка"},
            {id: "Calculator", value: "Калькулятор"},
        ]
    },
    {
        id: "Appointment",  icon: 'fas fa-calendar-alt', value: "Записаться",
    },
    {
        id: "News", icon:'fas fa-newspaper', value: "Новости",
    },
    {
        id: "Requisites", icon:'fas fa-file-alt', value: "Реквизиты",
    },
    {
        id: "Contacts", icon: 'fas fa-address-card', value: "Контакты",
    },
];

function onMenuClick(id) {
    switch (id) {
        case ('Main'): {
            window.location.href = "/";
            break;
        }
        case ('aboutFond'): {
            window.location.href = "/about_fond";
            break;
        }
        case ('antiCorruption'): {
            window.location.href = "/about_anti_corruption";
            break;
        }
        case ('normDocs'): {
            window.location.href = "/normative_documents";
            break;
        }
        case ('infoDisclosure'): {
            window.location.href = "/information_disclosure";
            break;
        }
        case ('ProductList'): {
            window.location.href = "/product_list";
            break;
        }
        case ('ProductList_'): {
            window.location.href = "/product_list";
            break;
        }
        case ('termsOfProvidingMicroloans'): {
            window.location.href = "/terms_of_providing_microloans";
            break;
        }
        case ('documents'): {
            window.location.href = "/documents";
            break;
        }
        case ('Calculator'): {
            window.location.href = "/calculator";
            break;
        }
        case ('Appointment'): {
            window.location.href = "/appointment";
            break;
        }
        case ('News'): {
            window.location.href = "/news_list";
            break;
        }
        case ('Requisites'): {
            window.location.href = "/requisites";
            break;
        }
        case ('Contacts'): {
            window.location.href = "/contacts";
            break;
        }
        case ('documentsIP'): {
            window.location.href = "/documents_IP";
            break;
        }
        case ('documentsUL'): {
            window.location.href = "/documents_UL";
            break;
        }
    }
}

function getMenu() {
    if (document.body.clientWidth < main_body_width) {
        return smallMenu;
    } else {
        return bigMenu;
    }
}

const bigMenu = {
    view: 'menu',
    id: 'menuId',
    layout: 'x',
    css: 'fond',
    autowidth: true,
    data: menuData,
    type: {
        subsign: true,
        width: getMenuWidth(),
        height: 40,
    },
    on: {
        onMenuItemClick: function (id) {
            onMenuClick(id);
        }
    }
}

const smallMenu = {
    view: 'sidebar',
    id: 'menuId',
    // css: 'fond',
    data: sideBarData,
    collapsed:true,
    on: {
        onAfterSelect: function (id) {
            onMenuClick(id);
        },
        onAfterLoad: function(){
            var maxWidth =0;
            this.data.each(function(item){
                var size = webix.html.getTextSize(item.value);
                var width = 70 + size.width;
                if(width > maxWidth)
                    maxWidth = width;
            });
            this.define("width",maxWidth);
            this.resize();
        }
    }
}

export const menu = getMenu();

export function resizeMenuOptions(){
    const menu = $$('menuId');
    menu.customize({
        width: menu.$width / 8
    });
    menu.refresh();
}

function getMenuWidth() {
    // if (document.body.clientWidth < main_body_width) {
        return document.body.clientWidth/8;
    // } else {
    //     return (main_body_width - 5)/8;
    // }
}

