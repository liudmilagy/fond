import {createProductTime, createProductIcon, createProductLabel,
    createProductAmountWithDeposit, createProductAmountWithoutDeposit,
    createProductTextRateWithDeposit, createProductTextRateWithoutDeposit} from "./create_details.js";

function createButtonInDetails(product, isBigForm) {
    if (isBigForm) {
        return {
            cols: [
                {
                    id: 'appointmentBtn' + product.id,
                    view: 'button',
                    autowidth: true,
                    css: 'fond_round_1',
                    value: 'Записаться на прием',
                    click: () =>  window.location.href = "/appointment"
                },
                { gravity: 0.1 },
                {
                    id: 'productDocBtn' + product.id,
                    view: 'button',
                    autowidth: true,
                    css: 'fond_round_1',
                    value: 'Необходимые документы',
                    //click: () => changeContentView(appointment),
                    click: () => {
                        window.location.href = "/product_list/product/" + product.id;
                    }
                },
                {}
            ]
        }
    } else {
        return {
            rows: [
                {
                    id: 'appointmentBtn' + product.id,
                    view: 'button',
                    autowidth: true,
                    css: 'fond_round_1',
                    value: 'Записаться на прием',
                    click: () =>  window.location.href = "/appointment"
                },
                { gravity: 0.01 },
                {
                    id: 'productDocBtn' + product.id,
                    view: 'button',
                    autowidth: true,
                    css: 'fond_round_1',
                    value: 'Необходимые документы',
                    //click: () => changeContentView(appointment),
                    click: () => {
                        window.location.href = "/product_list/product/" + product.id;
                    }
                },
                {}
            ]
        }
    }
}

function createAmountRows(product, isBigForm) {
    var amountWithDeposit = createProductAmountWithDeposit(product);
    var amountWithoutDeposit = createProductAmountWithoutDeposit(product);
    var textRateWithDeposit = createProductTextRateWithDeposit(product);
    var textRateWithoutDeposit = createProductTextRateWithoutDeposit(product);

    if (isBigForm) {
        return  {
            cols: [
                {
                    hidden: product.hiddenWithoutDeposit,
                    gravity: 0.5,
                    rows: [
                        amountWithoutDeposit,
                        textRateWithoutDeposit
                    ]
                },
                {
                    hidden: product.hiddenWithDeposit,
                    gravity: 0.5,
                    rows: [
                        amountWithDeposit,
                        textRateWithDeposit,
                    ]
                },
            ]
        }
    } else {
        return  {
            type:"line",
            rows: [
                {
                    hidden: product.hiddenWithoutDeposit,
                    gravity: 0.5,
                    rows: [
                        amountWithoutDeposit,
                        textRateWithoutDeposit
                    ]
                },
                { hidden: product.hiddenWithDeposit, template:"", borderless:true, height: 13},
                {
                    hidden: product.hiddenWithDeposit,
                    gravity: 0.5,
                    rows: [
                        amountWithDeposit,
                        textRateWithDeposit,
                    ]
                },
            ]
        }
    }

}

function createIconAndLabel(product) {
    var label = createProductLabel(product);
    var icon = createProductIcon(product);

    return {
        view: 'form',
        borderless: true,
        align: 'center',
        rows: [
            icon,
            label,
            {gravity: 0.05}
        ]
    }
}

function createImgCover(product) {
    return {
        borderless: true,
        template: "<div class='product_item'>" +
            "<img src='" + product.attachmentPath + "' height='360' width='480' style='object-fit: cover'>" +
            product.name +" <br>" +
            // "Дата публикации: #startTime#"+
            "</div>",
    }
}

function createProductDetails(product, isBigForm) {
    var time = createProductTime(product);
    var buttonsInDetails = createButtonInDetails(product, isBigForm);
    var amountRows = createAmountRows(product, isBigForm);
    // var iconAndLabel = createIconAndLabel(product);
    var imgCover = createImgCover(product);

    if (isBigForm) {
        return {
            id: 'productCell' + product.id,
            // type: 'clean',
            // autoheight:true,
            // height: '100%',
            // height: 260,
            cols: [
                {
                    autowidth: true,
                    rows: [
                        time,
                        amountRows,
                        // {gravity: 0.01},
                        buttonsInDetails,
                    ]
                },
                {
                    gravity: 0.4,
                    rows: [
                        // iconAndLabel
                        imgCover,
                    ]
                }
            ]
        }
    } else {
        return {
            id: 'productCell' + product.id,
            // type: 'clean',
            // autoheight:true,
            // height: '100%',
            height: 500,
            autowidth: true,
            rows: [
                time,
                amountRows,
                // {gravity: 0.01},
                buttonsInDetails,
            ]
        }
    }


}

export function createProductDetailsCells(data, isBigForm) {
    var productDetailsCells = [];

    for (var k in data) {
        var detail = createProductDetails(data[k], isBigForm);
        productDetailsCells.push(detail);
    }

    return productDetailsCells;
}
