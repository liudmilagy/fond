import {header} from "../header/toolbar.js";
import {menu} from "../header/menu.js";
import {getOtherWidth, lft_wdth, rght_wdth} from "../general.js";

export const mainTemplate = {
    rows: [
        // mainHeader,
        {
            cols: [
                {
                    id: 'leftMainTemplateId',
                    width: getOtherWidth(),
                },
                {
                    rows:[
                        header,
                        menu,
                    ]
                },
                {
                    id: 'rightMainTemplateId',
                    width: getOtherWidth(),
                },
            ]
        },
        {
            id: 'content',
        },
    ]
}