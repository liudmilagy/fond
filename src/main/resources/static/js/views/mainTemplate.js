import {header} from "../header/toolbar.js";
import {menu} from "../header/menu.js";
import {lft_wdth, rght_wdth} from "../general.js";

export const mainTemplate = {
    rows: [
        // mainHeader,
        header,
        {
            cols: [
                lft_wdth,
                menu,
                rght_wdth,
            ]
        },
        {
            id: 'content',
        },
    ]
}