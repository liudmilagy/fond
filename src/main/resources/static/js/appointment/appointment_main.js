import {view_header, changeContentView, main_body_width, main_padding} from "../general.js";
webix.Date.startOnMonday = true;

const appointmentStep1 = {
        cols:[
            {},
            {
                view:"datatable",
                id:"appointment_datatable",
                // height:120,
                // xCount:1,
                header:false,
                select: "row",
                scroll: false,
                borderless: true,
                type: {
                    height: 60,
                    width:"auto"
                },
                columns: [
                    {
                        template:"<div class='webix_strong'>#name#</div> #description# ",
                        fillspace: true,
                        adjust: true,
                    },
                    {   header:"",
                        template:function(obj){
                            return "<div class='webix_button'><button class='btn_click' " +
                                "style='border: 1px solid #f8b195; border-radius: 10px; " +
                                "color: #6c5b7b; background-color: #fff;'>Записаться</button></div>";
                        }
                    }
                ],
                onClick:{
                    btn_click: function(ev, id, html){
                        // webix.alert("Clicked row "+id);
                        let row = $$('appointment_datatable').getItem(id);
                        let data = {
                            'idTypeAppointment': row.id,
                            // 'nameTypeAppointment': row.name,
                        };

                        // webix.ui(appointment_form, $$('appointmentMainId'));
                        $$("appointmentMultiviewId").getChildViews()[1].show();
                        $$('idTypeAppointment').setValue(row.id);
                    }
                },
                url: 'type_appointments',
            },
            {}
        ]
}


var calendarView = {
    weekHeader:false,
    weekNumber:false,
    view: "calendar",
    on: {
        onChange: function (value) {
            let idTypeAppointment = $$('idTypeAppointment').getValue();
            let params = {
                'id_type_appointment': idTypeAppointment,
                'date_string': dateFormat(value)
            };
            $$('chosenDateId').setValue(dateFormat(value));
            let xhr = webix.ajax().sync().get("free_times", params);
            let data = JSON.parse(xhr.responseText);
            $$('timeListId').parse(data);
            $$('timeListId').show();
            $$('timeListId').select(false);
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
                    view: 'template',
                    template: 'Нет записи',
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
                }
            ]
        },
        {},
    ]
}

const appointmentStep3 =  {
    cols: [
        {},
        {
            rows: [
                {
                  view:'label',
                  id: 'idTypeAppointment',
                  hidden: true,
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
                }
            ]
        },
        {}
    ]
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
    // scroll: 'xy',
    scroll: false,
    body: {
        rows: [
            {gravity: 0.03},
            {
                cols: [
                    {},
                    view_header("Онлайн запись"),
                    {},
                ]
            },
            {gravity: 0.03},
            // { id: 'idTypeAppointment', hidden: true},
            {
                view: 'multiview',
                id: 'appointmentMultiviewId',
                minHeight: 500,
                cells: [
                    appointmentStep1,
                    appointmentStep2,
                    appointmentStep3
                ]
            },
            {}
        ]
    }
}
