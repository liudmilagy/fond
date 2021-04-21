import {productDocs} from "./product_docs.js";
import {productInfo} from "./product_info.js";

export function productDataForm(segmentedValue, productId) {
    return {
        view: 'form',
        rows: [
            {
                view: 'segmented',
                id: 'productDataFormTabs',
                multiview: true,
                borderless: true,
                value: segmentedValue,
                optionWidth: 200,
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
                animate: false,
                cells: [
                    productInfo,
                    productDocs('product_file', 'product_files/' + productId)
                ]
            },
        ]
    }
}