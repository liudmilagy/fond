import {view_header} from "../general.js";

var programRichselect = {
    view: 'richselect',
    label: 'Программа',
    labelPosition: 'top',
    value: 1,
    options: [
        {id: 1, value: 'Старт',},
        {id: 2, value: 'Моногород',},
        {id: 3, value: 'Моногород приоритет',},
        {id: 4, value: 'Приоритет',},
        {id: 5, value: 'Бизнес-оборот',},
        {id: 6, value: 'Бизнес',},
        {id: 7, value: 'Рефинансирование',},
        {id: 8, value: 'Экспресс', },
    ]
}

var amountSlider = {
    view: 'slider',
    label: 'Размер займа',
    labelPosition: 'top',
    value: '300000',
    step: 10000,
    min: 100000,
    max: 300000,
    name: 'slider1',
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
    max: 36,
    name: 'slider2',
    title: webix.template("#value# мес."),
}

var depositRadio = {
    view: 'radio',
    label: '',
    value: 1,
    options: [
        {id: 1, value: 'Без залога'},
        {id: 2, value: 'С залогом'},
    ]
}

export const calculator = {
    view: 'form',
    // resize: true,
    borderless: true,
    margin: 3,
    gravity:0,
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
                    {
                        cols: [
                            {
                                view: 'label',
                                label: 'Процентная ставка годовых (%)',
                                align: 'left',
                            },
                            {},
                            {
                                view: 'label',
                                label: '3 %',
                                align: 'right',
                            },
                        ]
                    },
                    {
                        cols: [
                            {
                                view: 'label',
                                label: 'Ежемесячный платёж',
                                align: 'left',
                            },
                            {},
                            {
                                view: 'label',
                                label: '300 000 руб.',
                                align: 'right',
                            },
                        ]
                    },
                    {
                        cols: [
                            {
                                view: 'label',
                                label: 'Переплата',
                                align: 'left',
                            },
                            {},
                            {
                                view: 'label',
                                label: '100 руб.',
                                align: 'right',
                            },
                        ]
                    },
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