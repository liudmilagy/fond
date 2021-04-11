import {view_header} from "../general.js";
import {main_padding} from "../general.js";

// var programRichselect = {
//     view: 'richselect',
//     label: 'Программа',
//     labelPosition: 'top',
//     value: 1,
//     options: [
//         {id: 1, value: 'Старт',},
//         {id: 2, value: 'Моногород',},
//         {id: 3, value: 'Моногород приоритет',},
//         {id: 4, value: 'Приоритет',},
//         {id: 5, value: 'Бизнес-оборот',},
//         {id: 6, value: 'Бизнес',},
//         {id: 7, value: 'Рефинансирование',},
//         {id: 8, value: 'Экспресс', },
//     ]
// }
//
// var amountSlider = {
//     view: 'slider',
//     label: 'Размер займа',
//     labelPosition: 'top',
//     value: '300000',
//     step: 10000,
//     min: 100000,
//     max: 300000,
//     name: 'slider1',
//     title: webix.template("#value# руб"),
//     on:{
//         // onChange:function(){
//         //     this.define("title", "Final value " + this.getValue());
//         //     this.refresh();
//         // },
//         // onSliderDrag:function(){
//         //     this.define("title", "Dragging... Currently "+this.getValue());
//         //     this.refresh();
//         // }
//     }
// }
//
// var timeSlider = {
//     view: 'slider',
//     label: 'Срок займа',
//     labelPosition: 'top',
//     value: '12',
//     step: 1,
//     min: 6,
//     max: 36,
//     name: 'slider2',
//     title: webix.template("#value# мес."),
// }
//
// var depositRadio = {
//     // view: 'radio',
//     // label: '',
//     // value: 1,
//     // options: [
//     //     {id: 1, value: 'Без залога'},
//     //     {id: 2, value: 'С залогом'},
//     // ]
//     view: "switch", onLabel: "С залогом", offLabel:"Без залога", value: 0
// }
//
//  const calculator =

export function calculator() {

    var xhr = webix.ajax().sync().get('product_list_for_calculator');
    var data = JSON.parse(xhr.responseText);

    var key_rate = 6; // webix.ajax().sync().get();

    var programRichselect = {
        view: 'richselect',
        label: 'Программа',
        labelPosition: 'top',
        name: 'programRichselect',
        options: data,
        value: data[0],
    }

    var depositRadio = {
        view: "switch", name: 'deposit', onLabel: "С залогом", offLabel:"Без залога", value: 0
    }

    var amountSlider = {
        view: 'slider',
        name: 'amountSlider',
        label: 'Размер займа',
        labelPosition: 'top',
        value: data[0].minAmountWithDeposit,
        step: 10000,
        min: data[0].minAmountWithDeposit,
        max: data[0].maxAmountWithDeposit,
        title: webix.template("#value# руб"),
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
        label: 'Срок займа',
        labelPosition: 'top',
        value: '12',
        step: 1,
        min: 6,
        max: data[0].limitation,
        name: 'slider2',
        title: webix.template("#value# мес."),
    }

    var rate = {
        name: 'rate',
        cols: [
            {
                view: 'label',
                label: 'Процентная ставка годовых (%)',
                align: 'left',
            },
            {},
            {
                view: 'label',
                label: getRate(data[0].interestRateWithDeposit, data[0].hasKeyRateWithDeposit,
                                data[0].coefKeyRateWithDeposit, key_rate),
                align: 'right',
            }
        ]
    }

    var monthlyPayment = {
        cols: [
            {
                view: 'label',
                label: 'Ежемесячный платёж, руб.',
                align: 'left',
            },
            {},
            {
                view: 'label',
                label: getMonthlyPayment(getRate(data[0].interestRateWithDeposit, data[0].hasKeyRateWithDeposit,
                                                data[0].coefKeyRateWithDeposit, key_rate),
                                        data[0].minAmountWithDeposit, data[0].limitation),
                align: 'right',
            },
        ]
    }

    var overpayment = {
        cols: [
            {
                view: 'label',
                label: 'Переплата',
                align: 'left',
            },
            {},
            {
                view: 'label',
                label: getOverPayment(getRate(data[0].interestRateWithDeposit, data[0].hasKeyRateWithDeposit,
                                            data[0].coefKeyRateWithDeposit, key_rate),
                                     data[0].minAmountWithDeposit, data[0].limitation),
                align: 'right',
            },
        ]
    }

    return {
        view: 'form',
        // resize: true,
        borderless: true,
        margin: 3,
        gravity:0,
        padding: main_padding,
        rows: [
            view_header('Калькулятор'),
            {
                margin: 30,
                cols: [
                    {
                        margin: 10,
                        rows: [
                            programRichselect,
                            depositRadio,
                            amountSlider,
                            timeSlider
                        ]
                    },
                    {
                        margin: 10,
                        rows: [
                            rate,
                            monthlyPayment,
                            overpayment,
                            {
                                cols: [
                                    {
                                        view: 'label',
                                        label: 'Общая выплата',
                                        align: 'left',
                                    },
                                    {},
                                    {
                                        view: 'label',
                                        label: '610 000 руб.',
                                        align: 'right',
                                    },
                                ]
                            },
                        ]
                    }
                ]
            }]
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