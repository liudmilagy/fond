function getHeaderLabel(size) {
    return {
        rows: [
            {
                template: '<span style="font-size: larger">Микрокредитная компания</span><br>' +
                    '<span style="font-size: larger">Фонд поддержки малого предпринимательства Республики Бурятия</span><br>' +
                    '<span style="font-size: smaller">ОГРН 1020300978147, ИНН 0323072429, КПП 032301001</span><br>' +
                    '<span style="font-size: smaller">670000, Республика Бурятия, г. Улан-Удэ,ул. Партизанская 28</span>',
                borderless: true,
            }
        ]
    }
}

function getHeader(size) {
    var headerLabel = getHeaderLabel(size);

    return {
        view: 'toolbar',
        id: 'headerId',
        height: size,
        elements: [
            {
                view: 'button',
                type: 'image',
                image: '../imgs/icon_fond.webp',
                width: size,
                borderless: true,
            },
            headerLabel,
            {
                view: 'button',
                type: 'image',
                image: '../imgs/icon_my_business.webp',
                width: size,
                borderless: true,
            },
        ]

    }
}

export const header = getHeader(100);