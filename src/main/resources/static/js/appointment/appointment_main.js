import {view_header, changeContentView, main_body_width, main_padding} from "../general.js";
webix.Date.startOnMonday = true;
webix.i18n.setLocale("ru-RU")

const appointmentStep1Main = {
    view:"dataview",
    id:"appointment_datatable",
    // height:120,
    xCount:1,
    header:false,
    select: "row",
    scroll: false,
    borderless: true,
    // autowidth: true,
    type: {
        height: 100,
        width: 'auto',
        template:"<div class='btn_click'><img src='#attachmentPath#' style='width:100px; height: 100px;  object-fit: cover; padding-right: 10px; ' align='left'>" +
            "<div style='font-weight: bolder; font-size: larger'>#name#</div>" +
            "<div> #description#</div>" +
            "</div>"
    },
    // columns: [
    //     {
    //         id: 'appointmentNameId',
    //         template:"<div class='btn_click' style='overflow-wrap: normal'>#name#</div> #description# ",
    //         fillspace: true,
    //         adjust: true,
    //     },
    // ],
    onClick:{
        btn_click: function(ev, id, html){
            // webix.alert("Clicked row "+id);
            let row = $$('appointment_datatable').getItem(id);
            // webix.ui(appointment_form, $$('appointmentMainId'));
            $$("appointmentMultiviewId").getChildViews()[1].show();
            $$('idTypeAppointment').setValue(row.id);
            $$('nameTypeAppointment').setValue(row.name)
        }
    },
    url: 'type_appointments',
}

function appointmentStep1() {
    if (document.body.clientWidth < main_body_width) {
        return appointmentStep1Main
    } else return {
        cols: [
            {},
            appointmentStep1Main,
            {}
        ]
    }
}


var calendarView = {
    weekHeader:false,
    weekNumber:false,
    view: "calendar",
    on: {
        onChange: function (value) {
            $$('timeListId').clearAll();
            $$('timeListId').hide();
            $$('noTimeId').hide();

            let idTypeAppointment = $$('idTypeAppointment').getValue();
            let params = {
                'id_type_appointment': idTypeAppointment,
                'date_string': dateFormat(value)
            };
            $$('chosenDateId').setValue(dateFormat(value));
            let xhr = webix.ajax().sync().get("free_times", params); //TODO изменить выбор времени
            if (xhr.responseText != "" && xhr.responseText != "[]") {
                let data = JSON.parse(xhr.responseText);
                $$('timeListId').parse(data);
                $$('timeListId').show();
                $$('timeListId').select(false);
            } else  {
                $$('noTimeId').show();
            }
            $$('gotoStep3').hide();
        }
    }
};

const appointmentStep2 = {
    id: 'appointmentStep2Id',
    cols: [
        {},
        {
            rows: [
                calendarView,
                {
                    id: 'noTimeId',
                    view: 'label',
                    label: 'Нет записи',
                    hidden: true,
                },
                {
                    view: 'list',
                    id: 'timeListId',
                    select: true,
                    borderless: true,
                    scroll: true,
                    type: {
                        width: 'auto',
                        height: 'auto'
                    },
                    hidden: true,
                    on: {
                        onItemClick: () => {
                            $$("gotoStep3").show();
                        }
                    }
                },
                {
                    view: 'button',
                    value: 'Продолжить',
                    id: 'gotoStep3',
                    css: 'webix_primary',
                    hidden: true,
                    click: () => {
                        $$('chosenTimeId').setValue($$('timeListId').getSelectedItem().value);
                        $$("appointmentMultiviewId").getChildViews()[2].show();
                    }
                },
                {}
            ]
        },
        {},
    ]
}

const appointmentStep3Main = {
    rows: [
        {
            view:'label',
            id: 'idTypeAppointment',
            hidden: true,
        },
        {
            view: 'text',
            id: 'nameTypeAppointment',
            label: '',
            labelPosition: 'top',
            disabled: true,
        },
        {
            cols: [
                {
                    view: 'text',
                    id: 'chosenDateId',
                    label: 'Дата',
                    labelPosition: 'top',
                    disabled: true,
                },
                {
                    view: 'text',
                    id: 'chosenTimeId',
                    label: 'Время',
                    labelPosition: 'top',
                    disabled: true,
                }
            ],
        },
        {
            view: 'text',
            id: 'clientNameId',
            label: 'Имя',
            labelPosition: 'top',
            required: true,
        },
        {
            view: 'text',
            id: 'phoneNumberId',
            label: 'Номер телефона',
            labelPosition: 'top',
        },
        {
            view: 'text',
            id: 'emailId',
            label: 'Email',
            labelPosition: 'top',
        },
        {
            view: 'textarea',
            id: 'messageId',
            height: 150,
            label: 'Сообщение',
            labelPosition: 'top',
        },
        {
            cols: [
                {
                    view: 'button',
                    value: 'Записаться',
                    css: 'webix_primary',
                    maxWidth: 200,
                    click: () => {
                        $$('appointmentMultiviewId').disable();
                        var params = {
                            'idTypeAppointment': $$('idTypeAppointment').getValue(),
                            'date': $$('chosenDateId').getValue(),
                            'time': $$('chosenTimeId').getValue(),
                            'clientName': $$('clientNameId').getValue(),
                            'phoneNumber': $$('phoneNumberId').getValue(),
                            'email': $$('emailId').getValue(),
                            'message': $$('messageId').getValue(),
                        }

                        webix.ajax().headers({
                            'Content-Type': 'application/json'
                        }).post('save_client_appointment',
                            params).then(function (data) {
                            $$('appointmentMultiviewId').hide();
                            webix.message("Вы успешно записаны!", "success");
                        });
                    }
                },
                {},
            ]
        },
        {},
    ]
}

function appointmentStep3() {
    if (document.body.clientWidth < main_body_width) {
        return appointmentStep3Main
    } else  return {
        cols: [
            {},
            appointmentStep3Main,
            {}
        ]
    }
}

function dateFormat(obj){
    var formatter = webix.Date.dateToStr("%d.%m.%Y");
    if (obj){
        if (obj.length){
            return obj.map((item) =>{return formatter(new Date(item))}).join(",");
        }
        return formatter(obj);
    }
    return "";
};

export const appointment = {
    view: 'scrollview',
    // autowidth: true,
    autoheight: true,
    id: 'appointmentId',
    scroll: 'y',
    // scroll: false,
    body: {
        rows: [
            {
                // view: 'label',
                id: 'normativeDocsHeaderId',
                template: 'Онлайн запись',
                css: 'other_tab_main_title',
                borderless: true,
                align: 'center',
                autoheight: true,
            },
            {
                view: 'multiview',
                id: 'appointmentMultiviewId',
                minHeight: 700,
                // autoheight: true,
                cells: [
                    appointmentStep1(),
                    appointmentStep2,
                    appointmentStep3()
                ]
            },
            {}
        ]
    }
}
