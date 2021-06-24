import {productDocs} from "./product_docs.js";
import {productInfo} from "./product_info.js";

function getOptionWidth(isBigForm) {
    if (isBigForm) {
        return 300;
    } else  {
        return 150;
    }
}

function getDocumentCellName(isBigForm) {
    if (isBigForm) {
        return "Необходимые документы";
    } else  {
        return "Документы";
    }
}

export function productDataForm(segmentedValue, productId, productName, isBigForm) {
    return {
        view: 'form',
        rows: [
            {
                cols: [
                    {
                        view: 'icon',
                        icon:'fas fa-arrow-left',
                        align: 'left',
                        click: () => {
                            window.location.href = "/product_list";
                        }
                    },
                    {
                        id: 'productLabelId',
                        template: 'Продукт: ' + productName,
                        css: 'product_label_main_title',
                        borderless: true,
                        align: 'center',
                        autoheight: true,
                    },
                ]
            },
            {
                view: 'segmented',
                id: 'productDataFormTabs',
                multiview: true,
                borderless: true,
                value: segmentedValue,
                optionWidth: getOptionWidth(isBigForm),
                align: 'center',
                options: [
                    {
                        id: 'productInfoTab',
                        value: 'Описание',
                    },
                    {
                        id: 'productDocsTab',
                        value: getDocumentCellName(isBigForm),
                    },
                ],
            },
            {
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
