import {header} from "../header/toolbar.js";
import {getOtherWidth} from "../general.js";
import {menu} from "../header/menu.js";

export const mainTemplate = {
    rows: [
        // mainHeader,
        header,
        {
            cols: [
                {width: getOtherWidth()},
                menu,
                {width: getOtherWidth()},
            ]
        },
        {
            id: 'content',
        },
    ]
}