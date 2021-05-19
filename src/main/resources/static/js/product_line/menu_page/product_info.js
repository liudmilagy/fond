import {collapsedSideBarWidth} from "../../general.js";

function bigProductInfo() {
    return {
        view: 'scrollview',
        id: 'productInfoTab',
        scroll: false,
        borderless: true,
        body: {
            view: 'template',
            id: 'textHtmlId',
            scroll: true,
        }
    }
}

function smallProductInfo() {
    return {
        view: 'scrollview',
        id: 'productInfoTab',
        scroll: false,
        borderless: true,
        body: {
            view: 'template',
            id: 'textHtmlId',
            scroll: "auto",
            borderless: true,
        }
    }
}

export function productInfo(isBigForm) {
   if (isBigForm) {
       return bigProductInfo();
   } else {
       return smallProductInfo();
   }
}
