import {view_header, changeContentView} from "../general.js";
import {appointment_form} from "./appointment_time.js";

export const appointment_main = {
    id: 'appointmentMainId',
    view: 'form',
    rows: [
        {
            cols: [
                {},
                view_header("Онлайн запись"),
                {},
            ]
        },
        {
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
                                return "<div class='webix_button webix_primary'><button class='btn_click'>Записаться</button></div>";
                            }
                        }
                    ],
                    onClick:{
                        btn_click: function(ev, id, html){
                            // webix.alert("Clicked row "+id);
                            let row = $$('appointment_datatable').getItem(id);
                            let data = {
                                'idTypeAppointment': row.id,
                                'nameTypeAppointment': row.name,
                            };

                            webix.ui(appointment_form, $$('appointmentMainId'));
                            $$('appointmentFormId').parse(data);
                        }
                    },
                    url: 'type_appointments',
                },
                {}
            ]
        },
        {}
    ]

}