import {main_body_width} from "../general.js";

const bigHeaderLabel = {
    borderless: true,
    rows: [
        {
            template: '<div class="header_item"><span style="font-size: xx-large; color: #623B2A;">Микрокредитная компания</span><br>' +
                '<span style="font-size: x-large; color: #623B2A;">Фонд поддержки малого предпринимательства Республики Бурятия</span></div>',
                // '<span style="font-size: smaller; font-family:Montserrat, serif;">ОГРН 1020300978147, ИНН 0323072429, КПП 032301001</span><br>' +
                // '<span style="font-size: smaller; font-family:Montserrat, serif;">670000, Республика Бурятия, г. Улан-Удэ,ул. Партизанская 28</span>',
            onClick:{
                "header_item": () => {window.location.href = "/";}
            }
        }
    ]
}

const smallHeaderLabel = {
    borderless: true,
    rows: [
        {
            template: '<div class="header_item">' +
                // '<span style="font-family:Montserrat, serif; font-weight: bolder; color: #6c5b7b;">Микрокредитная компания</span><br>' +
                '<span style="font-weight: bolder; color: #623B2A; overflow-wrap: normal;">Фонд поддержки малого предпринимательства Республики Бурятия</span></div>',
            // '<span style="font-size: smaller; font-family:Montserrat, serif;">ОГРН 1020300978147, ИНН 0323072429, КПП 032301001</span><br>' +
            // '<span style="font-size: smaller; font-family:Montserrat, serif;">670000, Республика Бурятия, г. Улан-Удэ,ул. Партизанская 28</span>',
            autoheight: true,
            onClick:{
                "header_item": () => {window.location.href = "/";}
            }
        }
    ]
}

const icon_contacts = {
    // autowidth: true,
    maxWidth: 300,
    responsive:true,
    rows: [
        {
            template:"<span class='product_icon webix_icon fas fa-phone-alt' style='color: #6c5b7b;'></span> 8 (3012) 48-08-08 ",
            borderless: true,
        },
        {
            template:"<span class='product_icon webix_icon fas fa-envelope ' style='color: #6c5b7b;'></span> fond03@mail.ru",
            borderless: true,
        },
        {
            template:"<span class='product_icon webix_icon fas fa-map-marker-alt' style='color: #6c5b7b;'></span> ул. Партизанская 28",
            borderless: true,
        }
    ]
}

function smallHeader(size) {
    var xhr = webix.ajax().sync().get('fond_icon');
    var fondLogoPath = xhr.responseText;

    return {
        borderless: true,
        rows: [
        {
            view: 'toolbar',
            autoheight: true,
            elements: [
                {
                    view: 'icon',
                    icon: 'fas fa-bars',
                    click: () => {
                        $$('menuId').toggle()
                    }
                },
                smallHeaderLabel,
                {
                    borderless: true,
                    width: 70,
                    template: '<div class="index_item"><img align="right" width="50" height="50" src=' + fondLogoPath + ' style="object-fit:cover"></div>',
                    onClick: {
                        "index_item": () => {
                            window.location.href = "/";
                        }
                    }
                },
            ]
        }
            // cols: [
            //     {
            //         rows: [
            //             icon_contacts,
            //             smallHeaderLabel
            //         ]
            //     }
            //
            // ]
        // },
        ]
    }
}

function bigHeader(size) {
    var xhr = webix.ajax().sync().get('fond_icon');
    var fondLogoPath = xhr.responseText;

    var xhr = webix.ajax().sync().get('business_icon');
    var businessLogoPath = xhr.responseText;

    return {
        borderless: true,
        cols: [
            {
                view: 'toolbar',
                id: 'headerId',
                height: size,
                width: main_body_width,
                borderless: true,
                elements: [
                    {
                        width: size,
                        borderless: true,
                        template: "<div class = 'index_item'><img src='" + fondLogoPath +"' height='" + size + "' width='"+ size+ "' style='object-fit: cover; '>",
                        onClick: {
                            "index_item": () => {
                                window.location.href = "/";
                            }
                        }
                    },
                    {
                        width: size,
                        borderless: true,
                        template: "<div class = 'business_item'><img src='" + businessLogoPath +"' height='" + size + "' width='"+ size+ "' style='object-fit: cover; '>",
                        onClick: {
                            "business_item": () => {
                                window.open("https://fpmp03.ru/");
                            }
                        }
                    },
                    bigHeaderLabel,
                    // icon_contacts,
                ]
            },
        ]
    }
}

function getHeader(size) {
    if (document.body.clientWidth < 1000) {
        return smallHeader(size/2);
    } else {
        return bigHeader(size);
    }
}

export const header = getHeader(100);
