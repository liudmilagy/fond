import {view_header, main_padding, main_body_width, numberFormatWithoutDecimal, changeContentView} from "../general.js";
import {collapsedSideBarWidth} from "../general.js";
import {calculator_with_schedule, calculate} from "./calculator_with_schedule.js";

export function calculator(data) {

    // var xhr = webix.ajax().sync().get('product_list_for_calculator');
    // var data = JSON.parse(xhr.responseText);

    var key_rate = 4.5; // webix.ajax().sync().get();
    var rate = key_rate;

    var programRichselect = {
        view: 'richselect',
        id: 'programRichselectId',
        label: 'Программа',
        labelPosition: 'top',
        name: 'programRichselect',
        options: data,
        value: data[0],
        css: 'fond',
        bottomPadding: 10,
        on: {
            onChange: () => {
                setCalculatorResultValues(data);
            }
        },
    }

    var depositRadio = {
        view: "switch", name: 'deposit', id: 'depositId', onLabel: "С залогом", offLabel:"Без залога", value: 0,
        bottomPadding: 10,
        on: {
            onChange: () => {
                setCalculatorResultValues(data);
            }
        }
    }

    var amountSlider = {
        view: 'slider',
        name: 'amountSlider',
        id: 'amountSliderId',
        label: 'Размер займа',
        labelPosition: 'top',
        value: data[0].minAmountWithDeposit,
        step: 10000,
        min: data[0].minAmountWithDeposit,
        max: data[0].maxAmountWithDeposit,
        bottomPadding: 10,
        title:
            (obj) => {
            return webix.i18n.numberFormat(obj.value)
            },
        css: 'calculator_result',
        on:{
            onChange:function(){
                setCalculatorResultValues(data);
                // this.define("title", "Final value " + this.getValue());
                // this.refresh();

            },
            onSliderDrag:function(){
                setCalculatorResultValues(data);
                // this.define("title", "Dragging... Currently "+this.getValue());
                // this.refresh();
            }
        }
    }


    var timeSlider = {
        view: 'slider',
        id: 'timeSliderId',
        label: 'Срок займа',
        labelPosition: 'top',
        value: '12',
        step: 1,
        min: 6,
        max: data[0].limitation,
        name: 'slider2',
        title: webix.template("#value# мес."),
        css: 'calculator_result',
        bottomPadding: 10,
        on:{
            onChange:function(){
                setCalculatorResultValues(data);
                // this.define("title", "Final value " + this.getValue());
                // this.refresh();

            },
            onSliderDrag:function(){
                setCalculatorResultValues(data);
                // this.define("title", "Dragging... Currently "+this.getValue());
                // this.refresh();
            }
        }
    }

    var rate = {
        name: 'rate',
        cols: [
            {
                // view: 'label',
                // label: 'Процентная ставка (%)',
                template: 'Процентная ставка, %',
                autoheight: true,
                borderless: true,
                align: 'left',
                css: 'calculator_result',
            },
            {   gravity: 0.1},
            {
                view: 'label',
                id: 'rateLabelId',
                // label: getRate(data[0].interestRateWithDeposit, data[0].hasKeyRateWithDeposit,
                //                 data[0].coefKeyRateWithDeposit, key_rate),
                label: getRate(data, data[0].id, true),
                // template: 'N %',
                autoheight: true,
                borderless: true,
                align: 'right',
                css: 'calculator_result',

            },
            {
                view: 'text',
                id: 'rateValueId',
                value: getRate(data, data[0].id, true),
                hidden: true,
            }
        ]
    }

    var monthlyPayment = {
        cols: [
            {
                // view: 'label',
                // label: 'Ежемесячный платёж, руб.',
                template: 'Ежемесячный платёж, руб.',
                autoheight: true,
                borderless: true,
                align: 'left',
                css: 'calculator_result',
            },
            {   gravity: 0.1},
            {
                view: 'label',
                id: 'monthlyPaymentId',
                label: getMonthlyPayment(getRate(data, data[0].id, true),
                                        data[0].minAmountWithDeposit, data[0].limitation),
                // label: 0,
                // template: '0 руб.',
                autoheight: true,
                borderless: true,
                align: 'right',
                css: 'calculator_result',
            },
        ]
    }

    var overpayment = {
        cols: [
            {
                // view: 'label',
                // label: 'Переплата',
                template: 'Переплата',
                autoheight: true,
                borderless: true,
                align: 'left',
                css: 'calculator_result',
            },
            {   gravity: 0.1},
            {
                id: 'overPaymentId',
                view: 'label',
                label: getOverPayment(getRate(data, data[0].id, true),
                                     data[0].minAmountWithDeposit, data[0].limitation),
                // template: '0 руб.',
                autoheight: true,
                borderless: true,
                align: 'right',
                css: 'calculator_result',
            },
        ]
    }

    var link_to_schedule = {
        template: '<div class="schedule_link">Перейти к графику платежей</div>',
        borderless: true,
        align: 'left',
        css: 'calculator_template_link',
        onClick: {
            "schedule_link": () =>
                {
                    var rate = $$('rateValueId').getValue();
                    var limitation = $$('timeSliderId').getValue();
                    var amount = $$('amountSliderId').getValue();
                    // changeContentView(calculator_with_schedule());
                    var layout = webix.ui({
                        id: 'content',
                        rows: [
                            webix.copy(calculator_with_schedule())
                        ]
                    }, $$('content'));
                    $$('amountId').setValue(amount);
                    $$('limitationId').setValue(limitation);
                    $$('rateId').setValue(rate);
                    calculate();
                    $$('calculatorResultId').resize();
                }
        }
    }

    // var fullPayment = {
    //     cols: [
    //         {
    //             // view: 'label',
    //             // label: 'Общая выплата',
    //             template: 'Общая выплата',
    //             autoheight: true,
    //             borderless: true,
    //             align: 'left',
    //             css: 'calculator_result',
    //         },
    //         {   gravity: 0.1},
    //         {
    //             // view: 'label',
    //             // label: '610 000 руб.',
    //             template: '610 000 руб.',
    //             autoheight: true,
    //             borderless: true,
    //             align: 'right',
    //             css: 'calculator_result',
    //         },
    //     ]
    // }

    var leftSideCalculator =  {
        rows: [
            programRichselect,
            depositRadio,
            amountSlider,
            // amountAxis,
            timeSlider,
        ]
    }

    var rightSideCalculator = {
        rows: [
            rate,
            {},
            monthlyPayment,
            {},
            overpayment,
            {},
            link_to_schedule
            // fullPayment
        ]
    }

    var width = main_body_width;
    if (document.body.clientWidth < main_body_width) {
        width = document.body.clientWidth - collapsedSideBarWidth;
        return {
            // view: 'form',
            // resize: true,
            borderless: true,
            margin: 3,
            gravity:0,
            padding: main_padding,
            width: width,
            // type: 'space',
            rows: [
                view_header('Калькулятор'),
                {
                    borderless: true,
                    // type: 'space',
                    // css: 'fond_bg2',
                    margin: 30,
                    rows: [
                        leftSideCalculator,
                        rightSideCalculator
                    ]
                }]
        }
    } else {
        return {
            // view: 'form',
            // resize: true,
            borderless: true,
            margin: 3,
            gravity:0,
            padding: main_padding,
            width: width,
            // type: 'space',
            rows: [
                view_header('Калькулятор'),
                {
                    borderless: true,
                    // type: 'space',
                    // css: 'fond_bg2',
                    margin: 30,
                    cols: [
                        leftSideCalculator,
                        rightSideCalculator
                    ]
                }]
        }
    }
    }

function getRate(data, productId, withDeposit) {
    var rate;

    data.forEach(product => {
        if (product.id == productId) {
            if (withDeposit) {
                if (product.interestRateWithDeposit) {
                    rate = product.interestRateWithDeposit;
                } else {
                    rate = product.coefKeyRateWithDeposit * 5;
                }
            } else {
                if (product.interestRateWithoutDeposit) {
                    rate = product.interestRateWithoutDeposit;
                } else {
                    rate = product.coefKeyRateWithoutDeposit * 5;
                }

            }
        }
    })

    return rate;
}

function getRate0(interestRate, hasKeyRate, coefKeyRate, keyRate) {
    var rate = 0;
    if (hasKeyRate) {
        if (coefKeyRate != null) {
            rate = coefKeyRate*keyRate;
        } else {
            rate = keyRate;
        }
    } else {
        rate = interestRate;
    }

    return rate;
}

function getMonthlyPayment(rate, amount, limitation) {
    var r = rate*0.01/12;
    var monthlyPayment = (r + r/(Math.pow(1+r, limitation) - 1)) * amount;
    return webix.Number.format(monthlyPayment, {groupSize: 3, decimalSize: 2, decimalDelimiter: ".", groupDelimiter: " "});
}

function getOverPayment(rate, amount, limitation) {
    var r = rate*0.01/12;
    var monthlyPayment = (r + r/(Math.pow(1+r, limitation) - 1)) * amount;
    var overPayment = monthlyPayment* limitation - amount;
    return webix.Number.format(overPayment, {groupSize: 3, decimalSize: 2, decimalDelimiter: ".", groupDelimiter: " "});

}

function setCalculatorResultValues(data) {
    var rate = getRate(data, $$('programRichselectId').getValue(), $$('depositId').getValue());

    $$('rateLabelId').setValue(rate);
    $$('rateValueId').setValue(rate);

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