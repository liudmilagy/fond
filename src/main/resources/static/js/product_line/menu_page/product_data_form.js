import {productDocs} from "./product_docs.js";
import {productInfo} from "./product_info.js";

function getDocSegmentedValue(isBigForm) {
    if (isBigForm) {
        return 'Необходимые документы';
    } else {
        return 'Документы';
    }
}

export function productDataForm(segmentedValue, productId, productName, isBigForm) {
    return {
        view: 'form',
        rows: [
            {
                // view: 'label',
                // label: 'Продукт: ' + productName,
                template: '<div>Продукт: ' + productName +'</div>',
                css: 'product_label_main_title',
                borderless: true,
                autoheight: true,
                align: 'center',
            },
            {
                view: 'segmented',
                id: 'productDataFormTabs',
                multiview: true,
                borderless: true,
                value: segmentedValue,
                optionWidth: 200,
                align: 'center',
                options: [
                    {
                        id: 'productInfoTab',
                        value: 'Описание',
                    },
                    {
                        id: 'productDocsTab',
                        value: getDocSegmentedValue(isBigForm),
                    },
                ],
            },
            {
                view: "multiview",
                animate: true,
                borderless: true,
                cells: [
                    productInfo(isBigForm),
                    productDocs('product_file', 'product_files/' + productId)
                ]
            },
        ]
    }
}
