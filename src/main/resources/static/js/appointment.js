import {view_header} from "./general.js";
import {main_padding} from "./general.js";

webix.Date.startOnMonday = true;
webix.i18n.setLocale("ru-RU");

var data = [
    {id: 1, value: '10:00', disabled:true},
    {id: 2, value: '11:00',},
    {id: 3, value: '12:00',},
    {id: 4, value: '14:00',},
    {id: 5, value: '15:00',},
    {id: 6, value: '16:00',},
]

var calendarView = {
    weekHeader:true,
    weekNumber:true,
    view: "calendar",
    events:webix.Date.isHoliday
};

function createTimeBtn(time) {
    return {
        id: 'timeBtn' + time.id,
        view: 'button',
        autowidth: true,
        css: 'fond',
        value: time.value,
        // click: () => $$('timeCell' + time.id).show(),
    }
}

function createTimePicker() {
    var timeLineBtnData = [];

    for (var k in data) {
        var btn = createTimeBtn(data[k]);
        timeLineBtnData.push(btn);
    }

    var timeLineBtns = {
        view: 'flexlayout',
        gravity:0,
        margin: 10,
        rows: timeLineBtnData,
        align: 'center',
    }

    var timeLine = {
        view: 'form',
        // resize: true,
        borderless: true,
        margin: 3,
        gravity:0,
        rows: [
            timeLineBtns,
        ]
    }
    return timeLine;
}

var timePickerLine = createTimePicker();

export const calendar = {
    view: 'form',
    // resize: true,
    borderless: true,
    margin: 3,
    gravity:0,
    padding: main_padding,
    rows: [
        view_header('Записаться'),
        {
            // type: "wide",
            cols: [
                {}, calendarView, {},
            ]
        },
        timePickerLine,
        {
            rows: [
                {
                    view: 'text',
                    label: 'Имя',
                    labelPosition: 'top',
                    required: true,
                },
                {
                    view: 'text',
                    label: 'Номер телефона',
                    labelPosition: 'top',
                    required: true,
                },
                {
                    view: 'text',
                    label: 'Email',
                    labelPosition: 'top',
                    required: true,
                },
                {
                    view: 'textarea',
                    label: 'Сообщение',
                    labelPosition: 'top',
                    required: true,
                }
            ]
        },
        {
            cols: [
                {
                    view: 'button',
                    value: 'Записаться',
                    css: 'webix_primary',
                    maxWidth: 200,
                },
                {},
            ]
        }
    ]
}