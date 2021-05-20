import {view_header, main_padding, main_body_width, numberFormatWithoutDecimal} from "../general.js";
import {collapsedSideBarWidth} from "../general.js";

export function calculator() {

    var xhr = webix.ajax().sync().get('product_list_for_calculator');
    var data = JSON.parse(xhr.responseText);

    var key_rate = 4.5; // webix.ajax().sync().get();

    var programRichselect = {
        view: 'richselect',
        id: 'programRichselectId',
        label: 'Программа',
        labelPosition: 'top',
        name: 'programRichselect',
        options: data,
        value: data[0],
        css: 'fond'
    }

    var depositRadio = {
        view: "switch", name: 'deposit', id: 'depositId', onLabel: "С залогом", offLabel:"Без залога", value: 0,
        on: {
            onChange: () => {
                // webix.message("Раздел в разработке.")
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
        title:
            (obj) => {
            return webix.i18n.numberFormat(obj.value)
            },
        css: 'calculator_result',
        on:{
            // onChange:function(){
            //     this.define("title", "Final value " + this.getValue());
            //     this.refresh();
            // },
            // onSliderDrag:function(){
            //     this.define("title", "Dragging... Currently "+this.getValue());
            //     this.refresh();
            // }
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
    }

    var rate = {
        name: 'rate',
        cols: [
            {
                // view: 'label',
                // label: 'Процентная ставка годовых (%)',
                template: 'Процентная ставка годовых (%)',
                autoheight: true,
                borderless: true,
                align: 'left',
                css: 'calculator_result',
            },
            {   gravity: 0.1},
            {
                // view: 'label',
                id: 'rateLabelId',
                // label: getRate(data[0].interestRateWithDeposit, data[0].hasKeyRateWithDeposit,
                //                 data[0].coefKeyRateWithDeposit, key_rate),
                template: 'N %',
                autoheight: true,
                borderless: true,
                align: 'right',
                css: 'calculator_result',

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
                // view: 'label',
                // // label: getMonthlyPayment(getRate(data[0].interestRateWithDeposit, data[0].hasKeyRateWithDeposit,
                // //                                 data[0].coefKeyRateWithDeposit, key_rate),
                // //                         data[0].minAmountWithDeposit, data[0].limitation),
                // label: 0,
                template: '0 руб.',
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
                // view: 'label',
                // // label: getOverPayment(getRate(data[0].interestRateWithDeposit, data[0].hasKeyRateWithDeposit,
                // //                             data[0].coefKeyRateWithDeposit, key_rate),
                // //                      data[0].minAmountWithDeposit, data[0].limitation),
                // label: 0,
                template: '0 руб.',
                autoheight: true,
                borderless: true,
                align: 'right',
                css: 'calculator_result',
            },
        ]
    }

    var fullPayment = {
        cols: [
            {
                // view: 'label',
                // label: 'Общая выплата',
                template: 'Общая выплата',
                autoheight: true,
                borderless: true,
                align: 'left',
                css: 'calculator_result',
            },
            {   gravity: 0.1},
            {
                // view: 'label',
                // label: '610 000 руб.',
                template: '610 000 руб.',
                autoheight: true,
                borderless: true,
                align: 'right',
                css: 'calculator_result',
            },
        ]
    }

    var leftSideCalculator =  {
        margin: 10,
        rows: [
            programRichselect,
            depositRadio,
            amountSlider,
            // amountAxis,
            timeSlider
        ]
    }

    var rightSideCalculator = {
        margin: 10,
        rows: [
            rate,
            {},
            monthlyPayment,
            {},
            overpayment,
            {},
            fullPayment
        ]
    }

    var width = main_body_width;
    if (document.body.clientWidth < main_body_width) {
        width = document.body.clientWidth - collapsedSideBarWidth;
        return {
            view: 'form',
            // resize: true,
            borderless: true,
            margin: 3,
            gravity:0,
            padding: main_padding,
            width: width,
            rows: [
                view_header('Калькулятор'),
                {
                    margin: 30,
                    rows: [
                        leftSideCalculator,
                        rightSideCalculator
                    ]
                }]
        }
    } else {
        return {
            view: 'form',
            // resize: true,
            borderless: true,
            margin: 3,
            gravity:0,
            padding: main_padding,
            width: width,
            rows: [
                view_header('Калькулятор'),
                {
                    margin: 30,
                    cols: [
                        leftSideCalculator,
                        rightSideCalculator
                    ]
                }]
        }
    }
    }

function getRate(interestRate, hasKeyRate, coefKeyRate, keyRate) {
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
    return rate + amount + limitation; //поменять формулу
}

function getOverPayment(rate, amount, limitation) {
    return (rate + amount + limitation) / 100; //поменять формулу
}

export function setCalculatorValues(product) {
    $$('programRichselectId').setValue(product);
    $$('depositId').setValue(product);
    $$('amountSliderId').config.min = product.minAmountWithDeposit;
    $$('amountSliderId').config.max = product.maxAmountWithDeposit;
    $$('amountSliderId').setValue(product.minAmountWithDeposit);

    $$('timeSliderId').config.max = product.limitation;
    $$('timeSliderId').setValue(product.limitation);

    $$('rateLabelId').setValue(getRate(product.interestRateWithoutDeposit, product.hasKeyRateWithoutDeposit, product.coefKeyRateWithoutDeposit, 4.5))
}