import {collapsedSideBarWidth, main_body_width, view_header} from "../general.js";



function partnersDataview() {
    // var xhr = webix.ajax().sync().get('partners_main');
    // var data = JSON.parse(xhr.responseText);

    var width = main_body_width;
    if (document.body.clientWidth < main_body_width) {
        width = document.body.clientWidth - collapsedSideBarWidth;
    }

    return {
        view: 'dataview',
        id: 'partnerDataviewId',
        width: width,
        // resize: true,
        borderless: true,
        margin: 3,
        gravity:0,
        minHeight: 300,
        datafetch: 8,
        xCount: 4,
        yCount: 2,
        type:{
            width: 300,
            height: 300,
            template: "<div class = 'partner_item'><img src='#logoPath#' height='300' width='300' style='object-fit: cover'></div>"
        },
        scroll: false,
        url: 'partners_main',
        onClick:{
            "partner_item":function(ev, id){
                var item = $$('partnerDataviewId').getItem(id);
                window.open(item.url);
            }
        },
        pager: 'partnerPager',
    }
}

export function partners() {
    return {
        // view: 'form',
        // width: main_body_width,
        // borderless: true,
        padding: {
            top: 20,
            bottom: 20
        },
        rows: [
            view_header('Партнеры'),
            {
                cols: [
                    {},
                    {
                        view: 'pager',
                        id: 'partnerPager',
                        size: 8,
                        width: 80,
                        align: 'right',
                        animate:{
                            type:"slide"
                        },
                        template: '{common.prev()}{common.next()}'
                    },
                ]
            },
            partnersDataview(),
            // {
            //     view: 'pager',
            //     id: 'partnerPager',
            //     size: 4,
            //     animate:{
            //         type:"slide"
            //     },
            //     template: '{common.next()} '
            // },
            { gravity:0.001 },
        ]
    }
}