import {header} from "../header/toolbar.js";
import {menu} from "../header/menu.js";
import {getOtherWidth, main_body_width} from "../general.js";

function getMainTemplate() {
    if (document.body.clientWidth < main_body_width) {
        return smallMainTemplate;
    } else {
        return bigMainTemplate;
    }
}

const smallMainTemplate = {
    rows: [
        header,
        {
            cols:[
                menu,
                {
                    id: 'content',
                },
            ]
        }
    ]
}

const bigMainTemplate = {
    rows: [
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

export const mainTemplate = getMainTemplate();
