import {getOtherWidth} from "../../general.js";


const productHtml = {
    view: 'template',
    id: 'textHtmlId',
    borderless: true,
}

export const productInfo = {
    id: 'productInfoId',
    cols: [
        {width: getOtherWidth()},
        {
            rows: [
                {view: 'label', id: 'labelId'},
                productHtml,
            ]
        },
        {width: getOtherWidth()},
    ]
}