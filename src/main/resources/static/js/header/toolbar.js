import {getOtherWidth, main_body_width} from "../general.js";
import {lft_wdth, rght_wdth} from "../general.js";

function getHeaderLabel(size) {
    return {
        borderless: true,
        rows: [
            {
                template: '<div class="header_item"><span style="font-size: x-large; font-family:Montserrat, serif; font-weight: bolder; color: #6c5b7b;">Микрокредитная компания</span><br>' +
                    '<span style="font-size: x-large; font-family:Montserrat, serif; font-weight: bolder; color: #6c5b7b;">Фонд поддержки малого предпринимательства Республики Бурятия</span></div>',
                    // '<span style="font-size: smaller; font-family:Montserrat, serif;">ОГРН 1020300978147, ИНН 0323072429, КПП 032301001</span><br>' +
                    // '<span style="font-size: smaller; font-family:Montserrat, serif;">670000, Республика Бурятия, г. Улан-Удэ,ул. Партизанская 28</span>',
                onClick:{
                    "header_item": () => {window.location.href = "/";}
                }
            }
        ]
    }
}

const icon_contacts = {
    // autowidth: true,
    maxWidth: 300,
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
    // view:"list",
    // scroll: false,
    // borderless: true,
    // width: 100,
    // select:false,
    // data:[
    //     { icon:"phone-alt", name:"8 (3012) 48-08-08"},
    //     { icon:"envelope", name:"fond03@mail.ru"},
    //     { icon:"map-marker-alt", name:"г. Улан-Удэ,ул. Партизанская 28"},
    // ]
}

function getHeader(size) {
    var headerLabel = getHeaderLabel(size);

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
                        // view: 'button',
                        // type: 'image',
                        // image: '../imgs/icon_fond.webp',
                        width: size,
                        borderless: true,
                        template:'<div class="index_item"><img src="../imgs/icon_fond.webp" style="object-fit:cover"></div>',
                        onClick:{
                            "index_item": () => {window.location.href = "/";}
                        }
                    },
                    {
                        // view: 'button',
                        // type: 'image',
                        // image: '../imgs/icon_my_business.webp',
                        width: size,
                        borderless: true,
                        template:'<div class="business_item"><img src="../imgs/icon_my_business.webp" style="object-fit:cover"></div>',
                        onClick:{
                            "business_item": () => {
                                window.open("https://fpmp03.ru/");
                                }
                            }
                        },
                    headerLabel,
                    icon_contacts,
                ]
            },
        ]
    }
}

export const header = getHeader(100);