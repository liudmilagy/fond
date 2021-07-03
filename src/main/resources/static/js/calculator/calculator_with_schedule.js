import {view_header, main_padding, main_body_width, numberFormatWithoutDecimal, getOtherWidth} from "../general.js";
import {collapsedSideBarWidth} from "../general.js";

export function calculateAnnuity() {
    $$('calculatorDatatableId').clearAll();
    $$('monthlyPaymentId').setValue("");
    $$('overPaymentId').setValue("");
    $$('calculatorResultId').hide();

    if (($$('amountId').getValue() != "")
        && ($$('limitationId').getValue() != "") && ($$('limitationId').getValue() > 0)
        && ($$('rateId').getValue() != "") && ($$('rateId').getValue() > 0) && ($$('rateId').getValue() < 100)) {

        $$('calculatorResultId').show();

        var i = 1;
        var rate = $$('rateId').getValue();
        var r = rate*0.01/12;
        var months = $$('limitationId').getValue();
        var amountStr = $$('amountId').getValue().toString();
        amountStr = amountStr.replace(" ", "");
        var amount = parseInt(amountStr);

        var monthlyPayment = getMonthlyPayment(rate, amount, months);
        var overPayment = getOverPayment(rate, amount, months);
        $$('monthlyPaymentId').setValue(webix.Number.format(monthlyPayment, {groupSize: 3, decimalSize: 2, decimalDelimiter: ".", groupDelimiter: " "}));
        $$('overPaymentId').setValue(webix.Number.format(overPayment, {groupSize: 3, decimalSize: 2, decimalDelimiter: ".", groupDelimiter: " "}));
        var balanceOwed = amount;

        for (; i <= months; i++) {
            var mainDebt = getMainDebt(monthlyPayment, r, i, months);
            balanceOwed = balanceOwed - mainDebt;
            var row = {
                'index': i,
                'monthlyPayment': webix.Number.format(monthlyPayment, {groupSize: 3, decimalSize: 2, decimalDelimiter: ".", groupDelimiter: " "}),
                'mainDebt': webix.Number.format(mainDebt, {groupSize: 3, decimalSize: 2, decimalDelimiter: ".", groupDelimiter: " "}),
                'percentDebt': webix.Number.format(monthlyPayment - mainDebt, {groupSize: 3, decimalSize: 2, decimalDelimiter: ".", groupDelimiter: " "}),
                'balanceOwed': webix.Number.format(balanceOwed, {groupSize: 3, decimalSize: 2, decimalDelimiter: ".", groupDelimiter: " "}),
            };
            $$('calculatorDatatableId').add(row);
        }
    }
}

export function calculateDifferentiated() {
    $$('calculatorDatatableId').clearAll();
    $$('monthlyPaymentId').setValue("");
    $$('overPaymentId').setValue("");
    $$('calculatorResultId').hide();

    if (($$('amountId').getValue() != "")
        && ($$('limitationId').getValue() != "") && ($$('limitationId').getValue() > 0)
        && ($$('rateId').getValue() != "") && ($$('rateId').getValue() > 0) && ($$('rateId').getValue() < 100)) {

        $$('calculatorResultId').show();

        var i = 1;
        var rate = $$('rateId').getValue();
        var months = $$('limitationId').getValue();
        var amountStr = $$('amountId').getValue().toString();
        amountStr = amountStr.replace(" ", "");
        var amount = parseInt(amountStr);

        // $$('monthlyPaymentId').setValue(webix.Number.format(monthlyPayment, {groupSize: 3, decimalSize: 2, decimalDelimiter: ".", groupDelimiter: " "}));
        var firstPayment = '';
        var lastPayment = '';
        var overPayment = 0;

        for (i = 1; i <= months; i++) {
            var percentDebt = getPercentDebtDifferentiated(rate, amount, months, i);
            overPayment = overPayment + percentDebt;
            var monthlyPayment = amount / months + percentDebt;
            if (i===1) {
                firstPayment = monthlyPayment;
            } else if (i.toString()===months) {
                lastPayment = monthlyPayment;
            }
            var mainDebt = amount / months;
            var balanceOwed = amount - mainDebt*i;
            var row = {
                'index': i,
                'monthlyPayment': webix.Number.format(monthlyPayment, {groupSize: 3, decimalSize: 2, decimalDelimiter: ".", groupDelimiter: " "}),
                'mainDebt': webix.Number.format(mainDebt, {groupSize: 3, decimalSize: 2, decimalDelimiter: ".", groupDelimiter: " "}),
                'percentDebt': webix.Number.format(percentDebt, {groupSize: 3, decimalSize: 2, decimalDelimiter: ".", groupDelimiter: " "}),
                'balanceOwed': webix.Number.format(balanceOwed, {groupSize: 3, decimalSize: 2, decimalDelimiter: ".", groupDelimiter: " "}),
            };
            $$('calculatorDatatableId').add(row);
        }

        var lastPaymentInFormat = webix.Number.format(lastPayment, {groupSize: 3, decimalSize: 2, decimalDelimiter: ".", groupDelimiter: " "});
        var firstPaymentInFormat = webix.Number.format(firstPayment, {groupSize: 3, decimalSize: 2, decimalDelimiter: ".", groupDelimiter: " "});
        $$('monthlyPaymentId').setValue(lastPaymentInFormat + ' ... ' + firstPaymentInFormat);
        $$('overPaymentId').setValue(webix.Number.format(overPayment, {groupSize: 3, decimalSize: 2, decimalDelimiter: ".", groupDelimiter: " "}));

    }
}

function calculator_form(label_position) {
    return {
        rows: [
            {
                padding: 20,
                rows: [
                    {
                        view: 'template',
                        id: 'contactsHeaderId',
                        css: 'product_label_main_title',
                        template: 'Калькулятор',
                        borderless: true,
                        align: 'center',
                        autoheight: true,
                    },
                ]
            },
            {
                cols: [
                    {
                        rows: [
                            {
                                view: 'text',
                                id: 'amountId',
                                maxWidth: 750,
                                label: 'Размер займа, руб.',
                                labelPosition: label_position,
                                labelWidth: 250,
                                required: true,
                                format: "1 111",
                            },
                            {
                                view: 'text',
                                id: 'limitationId',
                                maxWidth: 750,
                                label: 'Срок, мес.',
                                labelPosition: label_position,
                                labelWidth: 250,
                                required: true,
                                validate: function (val) {
                                    return !isNaN(val * 1);
                                }, attributes: {type: "number"}
                            },
                            {
                                view: 'text',
                                id: 'rateId',
                                maxWidth: 750,
                                label: 'Процентная ставка, %',
                                labelPosition: label_position,
                                labelWidth: 250,
                                required: true,
                                validate: function (val) {
                                    return !isNaN(val * 1);
                                }, attributes: {type: "number"}
                            },
                            {
                                view:"richselect",
                                id: 'typeId',
                                label:"Вид платежа",
                                labelPosition: label_position,
                                labelWidth: 250,
                                value:2, options:[
                                    { "id":1, "value":"Аннуитетный"},
                                    { "id":2, "value":"Дифференцированный"},
                                ]
                            }
                        ]
                    },
                    {}
                ]
            },
            {
                cols: [
                    {
                        view: 'button',
                        id: 'calculateBtnId',
                        value: 'Рассчитать',
                        css: 'fond',
                        maxWidth: 250,
                        click: () => {
                            if ($$('typeId').getValue()===1) {
                                calculateAnnuity();
                            } else {
                                calculateDifferentiated();
                            }
                        }
                    },
                    {},
                ]
            },
            {
                view: 'form',
                id: 'calculatorResultId',
                hidden: true,
                padding: 0,
                rows: [
                    {
                        cols: [
                            {
                                rows: [
                                    {
                                        view: 'text',
                                        id: 'monthlyPaymentId',
                                        css: {
                                            'background-color': 'transparent',
                                        },
                                        label: 'Ежемесячный платеж, руб.',
                                        labelPosition: 'top',
                                        readonly: true,
                                    },
                                    {
                                        view: 'text',
                                        id: 'overPaymentId',
                                        label: 'Переплата по процентам, руб.',
                                        labelPosition: 'top',
                                        readonly: true,
                                    },
                                ]
                            },
                            {}
                        ]
                    },
                    {
                        view: 'label',
                        label: 'График платежей'
                    },
                    {
                        view: 'datatable',
                        id: 'calculatorDatatableId',
                        autoheight: true,
                        select: 'row',
                        multiselect: false,
                        columns: [
                            {
                                id: 'index',
                                header: '№ месяца',
                                fillspace: 1,
                                adjust: true,
                            },
                            {
                                id: 'monthlyPayment',
                                header: 'Сумма платежа, руб',
                                fillspace: 3,
                                adjust: true,
                            },
                            {
                                id: 'mainDebt',
                                header: 'Выплата основного долга, руб',
                                fillspace: 3,
                                adjust: true,
                            },
                            {
                                id: 'percentDebt',
                                header: 'Выплата процентов, руб',
                                fillspace: 3,
                                adjust: true,
                            },
                            {
                                id: 'balanceOwed',
                                header: 'Остаток долга, руб',
                                fillspace: 4,
                                adjust: true,
                            },
                        ]
                    }
                ]
            },
        ]
    }
}

export function calculator_with_schedule(isBigForm) {
    if (isBigForm) {
        return {
            view: 'scrollview',
            scroll: 'xy',
            body: {
                cols: [
                    {
                        width: getOtherWidth(),
                    },
                    {
                        margin: 20,
                        padding: 10,
                        borderless: true,
                        rows: [
                            calculator_form('left'),
                        ]
                    },
                    {
                        width: getOtherWidth(),
                    },
                ]
            }
        }
    } else {
        return {
            view: 'scrollview',
            scroll: 'xy',
            body: {
                rows: [
                    {
                        // margin: 20,
                        // padding: 10,
                        borderless: true,
                        rows: [
                            calculator_form('top'),
                        ]
                    },
                ]
            }
        }
    }
}

/// Аннуитентный
function getMonthlyPayment(rate, amount, limitation) {
    var r = rate*0.01/12;
    var monthlyPayment = (r + r/(Math.pow(1+r, limitation) - 1)) * amount;
    // return webix.Number.format(monthlyPayment, {groupSize: 3, decimalSize: 2, decimalDelimiter: ".", groupDelimiter: " "});
    return monthlyPayment;
}

function getOverPayment(rate, amount, limitation) {
    var r = rate*0.01/12;
    var monthlyPayment = (r + r/(Math.pow(1+r, limitation) - 1)) * amount;
    var overPayment = monthlyPayment* limitation - amount;
    // return webix.Number.format(overPayment, {groupSize: 3, decimalSize: 2, decimalDelimiter: ".", groupDelimiter: " "});
    return overPayment;
}

function getMainDebt(monthlyPayment, r, i, months) {
    return monthlyPayment*Math.pow(1+r, i-months-1);
}

/// Дифференцированный
function getPercentDebtDifferentiated(rate, amount, limitation, monthNumber) {
    var r = rate*0.01/12;
    var paymentWOPercent = amount/limitation;
    var moneyRest = amount - (monthNumber-1)*paymentWOPercent;
    var paymentWPercent = moneyRest*r;
    return paymentWPercent;
}

function setCalculatorResultValues(data) {
    var rate = getRate(data, $$('programRichselectId').getValue(), $$('depositId').getValue());

    $$('rateLabelId').setValue(rate);

    $$('monthlyPaymentId').setValue(getMonthlyPayment(rate, $$('amountSliderId').getValue(), $$('timeSliderId').getValue()));
    $$('overPaymentId').setValue(getOverPayment(rate, $$('amountSliderId').getValue(), $$('timeSliderId').getValue() ))
}

export function setCalculatorValues(product) {
    $$('programRichselectId').setValue(product);
    $$('depositId').setValue(product);
    $$('amountSliderId').config.min = product.minAmountWithDeposit;
    $$('amountSliderId').config.max = product.maxAmountWithDeposit;
    $$('amountSliderId').setValue(product.minAmountWithDeposit);

    $$('timeSliderId').config.max = product.limitation;
    $$('timeSliderId').setValue(product.limitation);

    // $$('rateLabelId').setValue(getRate(product.interestRateWithoutDeposit, product.hasKeyRateWithoutDeposit, product.coefKeyRateWithoutDeposit, 4.5))
}