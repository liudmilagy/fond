import {productDocs} from "./product_docs.js";
import {productInfo} from "./product_info.js";

export function productDataForm(segmentedValue, productId, productName) {
    return {
        view: 'form',
        rows: [
            {
                view: 'label',
                label: 'Продукт: ' + productName,
                css: 'product_label_main_title',
                borderless: true,
                align: 'center',
            },
            {
                view: 'segmented',
                id: 'productDataFormTabs',
                multiview: true,
                borderless: true,
                value: segmentedValue,
                optionWidth: 300,
                align: 'center',
                options: [
                    {
                        id: 'productInfoTab',
                        value: 'Описание',
                    },
                    {
                        id: 'productDocsTab',
                        value: 'Необходимые документы',
                    },
                ],
            },
            {
                // id: 'tabview',
                view: "multiview",
                animate: true,
                borderless: true,
                cells: [
                    productInfo,
                    productDocs('product_file', 'product_files/' + productId)
                ]
            },
        ]
    }
}
