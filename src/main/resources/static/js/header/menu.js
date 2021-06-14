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
            {id: 'documents',value: "Документы"},
            {id: "ProductList", value: "Продуктовая линейка"},
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
        id: 'Main', value: 'Главная',
    },
    {
        id: "2", icon: 'fas fa-info-circle', value: "О Фонде",
        data: [
            {id: 'aboutFond', icon: 'fas fa-book-open', value: "Информация о фонде"},
            {id: 'antiCorruption', value: 'О противодействии коррупции'},
            {id: 'normDocs',  icon: 'fas fa-file-contract', value: 'Нормативные документы'},
            {id: 'infoDisclosure', value: 'Раскрытие информации'}
        ]
    },
    {
        id: "ProductList", icon: 'fas fa-wallet', value: "Продуктовая линейка",
    },
    {
        id: "4", value: "Предпринимателям",
        data: [
            {id: 'termsOfProvidingMicroloans',value: "Правила предоставления микрозаймов"},
            {id: 'documents',value: "Документы"},
            {id: "ProductList", value: "Продуктовая линейка"},
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
        id: "Requisites", value: "Реквизиты",
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
            window.location.href = "about_fond";
            break;
        }
        case ('antiCorruption'): {
            window.location.href = "about_anti_corruption";
            break;
        }
        case ('normDocs'): {
            window.location.href = "normative_documents";
            break;
        }
        case ('infoDisclosure'): {
            window.location.href = "information_disclosure";
            break;
        }
        case ('ProductList'): {
            window.location.href = "product_list";
            break;
        }
        case ('termsOfProvidingMicroloans'): {
            window.location.href = "terms_of_providing_microloans";
            break;
        }
        case ('documents'): {
            window.location.href = "documents";
            break;
        }
        case ('Calculator'): {
            window.location.href = "calculator";
            break;
        }
        case ('Appointment'): {
            window.location.href = "appointment";
            break;
        }
        case ('News'): {
            window.location.href = "news_list";
            break;
        }
        case ('Requisites'): {
            window.location.href = "requisites";
            break;
        }
        case ('Contacts'): {
            window.location.href = "contacts";
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

