import {changeContentView, numberFormatWithoutDecimal} from "../../general.js";
import {createProductTime, createProductIcon, createProductLabel,
    createProductAmountWithDeposit, createProductAmountWithoutDeposit,
    createProductTextRateWithDeposit, createProductTextRateWithoutDeposit} from "./create_details.js";
import {appointment} from "../../appointment/appointment_main.js";
import {productDataForm} from "../menu_page/product_data_form.js";

function createProductDetails(product) {
    var label = createProductLabel(product);
    var time = createProductTime(product);
    var amountWithDeposit = createProductAmountWithDeposit(product);
    var amountWithoutDeposit = createProductAmountWithoutDeposit(product);
    var textRateWithDeposit = createProductTextRateWithDeposit(product);
    var textRateWithoutDeposit = createProductTextRateWithoutDeposit(product);
    var icon = createProductIcon(product);

    var buttonsInDetails = {
        cols: [
            {
                id: 'appointmentBtn' + product.id,
                view: 'button',
                autowidth: true,
                css: 'fond_round_1',
                value: 'Записаться на прием',
                click: () => changeContentView(appointment),
            },
            { gravity: 0.1 },
            {
                id: 'productDocBtn' + product.id,
                view: 'button',
                autowidth: true,
                css: 'fond_round_2',
                value: 'Необходимые документы',
                //click: () => changeContentView(appointment),
                click: () => {
                    changeContentView(productDataForm('productDocsTab', product.id, product.name));
                    $$('labelId').setValue(product.name);
                    $$('textHtmlId').setHTML(product.htmlText);
                }
            },
            {}
        ]
    }

    var amountRows = {
            cols: [
                {
                    gravity: 0.5,
                    rows: [
                        amountWithoutDeposit,
                        textRateWithoutDeposit
                    ]
                },
                {
                    gravity: 0.5,
                    rows: [
                        amountWithDeposit,
                        textRateWithDeposit,
                    ]
                },
            ]
    };

    var iconAndLabel = {
        rows: [
            {gravity: 0.5},
            icon,
            // label
        ]
    }


    return {
        id: 'productCell' + product.id,
        // type: 'clean',
        // autoheight:true,
        height: '100%',
        cols: [
            {
                autowidth: true,
                rows: [
                    time,
                    amountRows,
                    {},
                    buttonsInDetails
                ]
            },
            {
                gravity: 0.3,
                rows: [
                    iconAndLabel
                ]
            }
        ]
    }
}

export function createProductDetailsCells(data) {
    var productDetailsCells = [];

    for (var k in data) {
        var detail = createProductDetails(data[k]);
        productDetailsCells.push(detail);
    }

    return productDetailsCells;
}
