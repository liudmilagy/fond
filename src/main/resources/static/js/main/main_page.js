import {getOtherWidth} from "../general.js";
import {footer} from "../footer/footer.js";
import {map} from "../map/map.js";
import {calculator} from "../calculator/calculator.js";
import {productLine} from "../product_line/main_page/product_line.js";
import {view_header} from "../general.js";

export const main_page = {
    id: 'mainPageId',
    css: 'fond_bg2',
    type:"space",
    view: 'scrollview',
    scroll: 'xy',
    body: {
        // padding: 20,
        margin: 10,
        rows: [
            {
                cols: [
                    { width: getOtherWidth()},
                    {
                        rows: [
                            // carousel,
                            productLine(),
                            {},
                            calculator(),
                            {},
                            {},
                            view_header('Новости'),
                            {
                                view: 'label',
                                label:  'Раздел новостей находится в разработке',
                                align: 'center',
                            },
                            {},
                            map(),
                            {},
                        ]
                    },
                    { width: getOtherWidth()},
                ],
            },
            footer
        ]
    }
}