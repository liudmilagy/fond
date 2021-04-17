import {getOtherWidth} from "../../general.js";


const productHtml = {
    view: 'template',
    id: 'textHtmlId',
    scroll: true,
    borderless: true,
}

export const productInfo = {
    id: 'productInfoId',
    cols: [
        {width: getOtherWidth()},
        {
            rows: [
                {view: 'label', id: 'labelId', hidden:true},
                productHtml,
            ]
        },
        {width: getOtherWidth()},
    ]
}