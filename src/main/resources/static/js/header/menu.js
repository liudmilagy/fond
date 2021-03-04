export const menu = {
    view: 'menu',
    id: 'menuId',
    layout: 'x',
    css: 'webix_dark',
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
        width: document.body.clientWidth/6,
    },
}

export function resizeMenuOptions(){
    const menu = $$('menuId');
    menu.customize({
        width: menu.$width / 6
    });
    menu.refresh();
}