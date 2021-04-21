import {changeContentView, numberFormatWithoutDecimal} from "../../general.js";
import {createProductTime, createProductIcon, createProductLabel,
    createProductAmountWithDeposit, createProductAmountWithoutDeposit,
    createProductTextRateWithDeposit, createProductTextRateWithoutDeposit} from "./create_details.js";
import {appointment} from "../../appointment/appointment_main.js";

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
                css: 'fond_round_blue',
                value: 'Записаться на прием',
                click: () => changeContentView(appointment),
            },
            { gravity: 0.1 },
            {
                id: 'productDocBtn' + product.id,
                view: 'button',
                autowidth: true,
                css: 'fond_round_sea',
                value: 'Необходимые документы',
                //click: () => changeContentView(appointment),
            },
            {}
        ]
    }

    var amountRows = {
            cols: [
                {
                    rows: [
                        amountWithoutDeposit,
                        textRateWithoutDeposit
                    ]
                },
                {
                    rows: [
                        amountWithDeposit,
                        textRateWithDeposit,
                    ]
                },
                {}
            ]
        };
    var iconAndLabel = {
        rows: [
            icon,
            label
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
            iconAndLabel
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
