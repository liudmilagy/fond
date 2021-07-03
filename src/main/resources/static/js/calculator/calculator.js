import {
    view_header,
    main_padding,
    main_body_width,
    numberFormatWithoutDecimal,
    changeContentView,
    view_header_left
} from "../general.js";
import {collapsedSideBarWidth} from "../general.js";
import {calculator_with_schedule, calculateDifferentiated} from "./calculator_with_schedule.js";

export function calculator(data) {
    var productMap = data.reduce((hashMap, obj) => {hashMap[obj.id] = obj; return hashMap}, {});

    var xhr = webix.ajax().sync().get('get_key_rate');
    var keyRate = JSON.parse(xhr.responseText);
    var defaultProgram = data[0];
    var defaultWithDeposit = !data[0].hiddenWithDeposit
    var disabledWithDeposit = data[0].hiddenWithDeposit || data[0].hiddenWithoutDeposit
    var defaultMinAmount = (defaultWithDeposit) ? data[0].minAmountWithDeposit :data[0].minAmountWithoutDeposit
    var defaultMaxAmount = (defaultWithDeposit) ? data[0].maxAmountWithDeposit :data[0].maxAmountWithoutDeposit
    var defaultLimitation = 6;
    var defaultRate = getRate(defaultProgram, defaultWithDeposit, keyRate);


    var programRichselect = {
        view: 'richselect',
        id: 'programRichselectId',
        label: 'Программа',
        labelPosition: 'top',
        name: 'programRichselect',
        options: data,
        value: defaultProgram,
        css: 'fond',
        bottomPadding: 10,
        on: {
            onChange: () => {
                var product = productMap[$$('programRichselectId').getValue()];
                setCalculatorValues(product);
            }
        },
    }

    var depositRadio = {
        view: "switch", name: 'deposit', id: 'depositId', onLabel: "С залогом", offLabel:"Без залога",
        value: defaultWithDeposit,
        disabled: disabledWithDeposit,
        bottomPadding: 10,
        on: {
            onChange: () => {
                var product = productMap[$$('programRichselectId').getValue()];
                setCalculatorValues(product);
            }
        }
    }

    var amountSlider = {
        view: 'slider',
        name: 'amountSlider',
        id: 'amountSliderId',
        label: 'Размер займа',
        labelPosition: 'top',
        value: defaultMinAmount,
        step: 10000,
        min: defaultMinAmount,
        max: defaultMaxAmount,
        bottomPadding: 10,
        title:
            (obj) => {
            return webix.i18n.numberFormat(obj.value)
            },
        css: 'calculator_result',
        on:{
            onChange:function(){
                var product = productMap[$$('programRichselectId').getValue()];
                setCalculatorResultValues(product, keyRate);
            },
            onSliderDrag:function(){
                var product = productMap[$$('programRichselectId').getValue()];
                setCalculatorResultValues(product, keyRate);
            }
        }
    }


    var timeSlider = {
        view: 'slider',
        id: 'timeSliderId',
        label: 'Срок займа',
        labelPosition: 'top',
        value: '6',
        step: 1,
        min: 6,
        max: defaultLimitation,
        name: 'slider2',
        title: webix.template("#value# мес."),
        css: 'calculator_result',
        bottomPadding: 10,
        on:{
            onChange:function(){
                var product = productMap[$$('programRichselectId').getValue()];
                setCalculatorResultValues(product, keyRate);
            },
            onSliderDrag:function(){
                var product = productMap[$$('programRichselectId').getValue()];
                setCalculatorResultValues(product, keyRate);
            }
        }
    }

    var rate = {
        name: 'rate',
        cols: [
            {
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
                label: defaultRate,
                autoheight: true,
                borderless: true,
                align: 'right',
                css: 'calculator_result',

            },
            {
                view: 'text',
                id: 'rateValueId',
                value: defaultRate,
                hidden: true,
            }
        ]
    }

    var monthlyPayment = {
        cols: [
            {
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
                // label: getMonthlyPayment(defaultRate, defaultMinAmount, defaultLimitation),
                label: getMonthlyPaymentDifferentiated(defaultRate, defaultMinAmount, defaultLimitation),
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
                // label: getOverPayment(defaultRate, defaultMinAmount, defaultLimitation),
                label: getOverPaymentDifferentiated(defaultRate, defaultMinAmount, defaultLimitation),
                autoheight: true,
                borderless: true,
                align: 'right',
                css: 'calculator_result',
            },
        ]
    }

    var link_to_schedule = {
        autoheight: true,
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
                    var isBigForm = true
                    if (document.body.clientWidth < main_body_width) {
                        isBigForm = false;
                    }
                    // changeContentView(calculator_with_schedule());
                    webix.ui({
                        id: 'content',
                        rows: [
                            webix.copy(calculator_with_schedule(isBigForm))
                        ]
                    }, $$('content'));
                    $$('amountId').setValue(amount);
                    $$('limitationId').setValue(limitation);
                    $$('rateId').setValue(rate);
                    $$('typeId').setValue(2);
                    calculateDifferentiated();
                    $$('calculatorResultId').resize();
                }
        }
    }


    var leftSideCalculator =  {
        rows: [
            programRichselect,
            depositRadio,
            amountSlider,
            timeSlider,
        ]
    }

    var rightSideCalculator = {
        autoheight: true,
        margin: 20,
        rows: [
            rate,
            {},
            monthlyPayment,
            {},
            overpayment,
            {},
            link_to_schedule
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
                view_header_left('Калькулятор'),
                {
                    borderless: true,
                    // type: 'space',
                    // css: 'fond_bg2',
                    // margin: 30,
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
                view_header_left('Калькулятор'),
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

function getRate(product, withDeposit, keyRate) {
    var rate;

    if (withDeposit) {
        if (product.hasKeyRateWithDeposit) {
            rate = product.coefKeyRateWithDeposit * keyRate;
        } else {
            rate = product.interestRateWithDeposit;
        }
    } else {
        if (product.hasKeyRateWithoutDeposit) {
            rate = product.coefKeyRateWithoutDeposit * keyRate;
        } else {
            rate = product.interestRateWithoutDeposit;
        }

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

function getMonthlyPaymentDifferentiated(rate, amount, limitation) {
    var monthlyPayment = (amount/limitation) * (1 + rate*(limitation+1)/2400);
    return webix.Number.format(monthlyPayment, {groupSize: 3, decimalSize: 2, decimalDelimiter: ".", groupDelimiter: " "});
}

function getOverPaymentDifferentiated(rate, amount, limitation) {
    var overPayment = amount * rate*(limitation+1)/2400;
    return webix.Number.format(overPayment, {groupSize: 3, decimalSize: 2, decimalDelimiter: ".", groupDelimiter: " "});

}

function setCalculatorResultValues(product, keyRate) {
    var rate = getRate(product, $$('depositId').getValue(), keyRate);

    $$('rateLabelId').setValue(rate);
    $$('rateValueId').setValue(rate);

    // $$('monthlyPaymentId').setValue(getMonthlyPayment(rate, $$('amountSliderId').getValue(), $$('timeSliderId').getValue()));
    // $$('overPaymentId').setValue(getOverPayment(rate, $$('amountSliderId').getValue(), $$('timeSliderId').getValue() ))
    $$('monthlyPaymentId').setValue(getMonthlyPaymentDifferentiated(rate, $$('amountSliderId').getValue(), $$('timeSliderId').getValue()));
    $$('overPaymentId').setValue(getOverPaymentDifferentiated(rate, $$('amountSliderId').getValue(), $$('timeSliderId').getValue() ))
}

export function clickOnProductButton(product){
    $$('programRichselectId').setValue(product);
    setCalculatorValues(product);
}

function setCalculatorValues(product) {
    var newDepositValue = getNewDepositValue(product);
    $$('depositId').setValue(newDepositValue);
    if (product.hiddenWithDeposit || product.hiddenWithoutDeposit) {
        $$('depositId').disable();
    } else {
        $$('depositId').enable();
    }
    setMinMaxAmountValues(product, newDepositValue);
    setLimitation(product);

    var xhr = webix.ajax().sync().get('get_key_rate');
    var keyRate = JSON.parse(xhr.responseText);
    setCalculatorResultValues(product, keyRate);
}

function setMinMaxAmountValues(product, depositValue) {
    var currentValue = $$('amountSliderId').getValue();
    var minAmount = (depositValue) ? product.minAmountWithDeposit : product.minAmountWithoutDeposit;
    var maxAmount = (depositValue) ? product.maxAmountWithDeposit : product.maxAmountWithoutDeposit;

    $$('amountSliderId').config.min = minAmount;
    $$('amountSliderId').config.max = maxAmount;
    if (currentValue > maxAmount) {
        $$('amountSliderId').setValue(maxAmount);
    } else if (currentValue < minAmount)  {
        $$('amountSliderId').setValue(minAmount);
    }
    $$('amountSliderId').refresh();
}

function setLimitation(product) {
    $$('timeSliderId').config.max = product.limitation;
    var currentValue = $$('timeSliderId').getValue();
    if (currentValue > product.limitation) {
        $$('timeSliderId').setValue(product.limitation);
    }
    $$('timeSliderId').refresh();
}


function getNewDepositValue(product) {
    if ($$('depositId').getValue() == 0 || $$('depositId').getValue() == false) {
        if (product.hiddenWithoutDeposit) {
            return true;
        } else {
            return false;
        }
    } else {
        if (product.hiddenWithDeposit) {
            return false;
        } else {
            return true;
        }
    }
}