import {getOtherWidth} from "../../general.js";


const productHtml = {
    view: 'template',
    id: 'textHtmlId',
    // scroll: true,
    borderless: true,
    autoheight: true,
}

export const productInfo = {
    view: 'scrollview',
    // autowidth: true,
    // autoheight: true,
    id: 'productInfoId',
    scroll: 'xy',
    body: {
        cols: [
            {width: getOtherWidth()},
            {
                rows: [
                    {view: 'label', id: 'labelId', hidden: true},
                    productHtml,
                ]
            },
            {width: getOtherWidth()},
        ]
    }
}