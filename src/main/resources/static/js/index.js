import {carousel} from "./header/carousel.js";

webix.i18n.locales["ru-RU"] = {
    groupSize:3,        // the number of digits in a group
    groupDelimiter:" ", // a mark that divides numbers with many digits into groups
    decimalDelimiter:",",// the decimal delimiter
    decimalSize:0       // the number of digits after the decimal mark
};

webix.i18n.setLocale("ru-RU")

import {productLine} from "/js/product_line/main_page/product_line.js";
import {resizeMenuOptions} from "./header/menu.js";
import {calculator} from "./calculator/calculator.js";
import {map} from "./map/map.js"
import {footer} from "./footer/footer.js"
import {news} from "./news/news_main.js";
import {image_header} from "./image_header/image_header.js";
import {mainTemplate} from "./views/mainTemplate.js";
import {lft_wdth, getOtherWidth, resizeSides, rght_wdth, main_body_width, padding_for_big_form} from "./general.js";
import {checkYourself} from "./check_yourself/check_yourself.js";
import {footer_contacts} from "./footer_contacts/footer_contacts.js";
import {partners} from "./partners/partners.js";

function bigMainPage() {
    let layout = webix.ui(mainTemplate);
    webix.ajax().get('product_list_for_calculator').then(function (xhr) {
        var calculatorData = xhr.json();
        // var xhr = webix.ajax().sync().get(

        webix.ui({
            id: 'content',
            // css: 'fond_bg2',                    // {
                    //     padding: padding_for_big_form,
                    //     // type: 'space',
                    //     // css: 'fond_bg2',
                    //     borderless: true,
                    //     rows: [
                    //         calculator(calculatorData),
                    //     ]
                    // },
            // type: "space",
            view: 'scrollview',
            scroll: 'xy',
            body: {
                // margin: 10,
                borderless: true,
                rows: [
                    image_header,
                    // carousel,
                    {
                        padding: padding_for_big_form,
                        borderless: true,
                        rows: [
                            productLine(calculatorData, true),
                        ]
                    },
                    {
                        padding: padding_for_big_form,
                        // type: 'space',
                        // css: 'fond_bg2',
                        borderless: true,
                        rows: [
                            calculator(calculatorData),
                        ]
                    },
                    {
                        padding: padding_for_big_form,
                        // type: "space",
                        borderless: true,
                        rows: [
                            checkYourself(true),
                            {},
                            partners(true),
                            {},
                            news(true),
                            {},
                            map(),
                            {},
                            footer_contacts(true)
                        ]
                    },
                    // footer()
                ]
            }
        }, $$('content'));
    });

    webix.event(window, "resize", function (event) {
        resizeMenuOptions();
        resizeSides();
        layout.resize();
        // layout.define("width",document.body.clientWidth);
        // layout.define("height",window.innerHeight);
        // layout.resize();

    });
}

function smallMainPage() {
    let layout = webix.ui(mainTemplate);
    webix.ajax().get('product_list_for_calculator').then(function (xhr) {
        var calculatorData = xhr.json();
        webix.ui({
            id: 'content',
            css: 'fond_bg2',
            type: "space",
            view: 'scrollview',
            scroll: 'xy',
            body: {
                // padding: 20,
                // margin: 10,
                borderless: true,
                rows: [
                    image_header,
                    {
                        rows: [
                            productLine(calculatorData, false),
                            {},
                            calculator(calculatorData),
                            {},
                        ]
                    },
                    {},
                    checkYourself(false),
                    {},
                    partners(false),
                    {},
                    news(false),
                    {},
                    map(),
                    // {},
                    footer_contacts(false),
                ]
            }
        }, $$('content'));
    });

    webix.event(window, "resize", function (event) {
        layout.resize();

    });

    if (webix.env.touch){
        webix.Touch.limit(true);
        layout.resize();
    };
}

webix.ready(function() {
    if (document.body.clientWidth < main_body_width) {
        return smallMainPage();
    } else {
        return bigMainPage();
    }

})
