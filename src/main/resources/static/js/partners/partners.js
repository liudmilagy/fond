import {collapsedSideBarWidth, main_body_width, view_header} from "../general.js";

function partnersDataviewWithPager(isBigForm) {
    if (isBigForm) {
        return {
            rows: [
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
                {
                    view: 'dataview',
                    id: 'partnerDataviewId',
                    width: main_body_width,
                    // resize: true,
                    borderless: true,
                    margin: 3,
                    gravity: 0,
                    minHeight: 300,
                    datafetch: 8,
                    xCount: 4,
                    yCount: 2,
                    type: {
                        width: 300,
                        height: 300,
                        template: "<div class = 'partner_item'><img src='#logoPath#' height='300' width='300' style='object-fit: cover'></div>"
                    },
                    scroll: false,
                    url: 'partners_main',
                    onClick: {
                        "partner_item": function (ev, id) {
                            var item = $$('partnerDataviewId').getItem(id);
                            window.open(item.url);
                        }
                    },
                    pager: 'partnerPager',
                },
            ]
        }
    } else {
        var pagerCnt = document.body.clientWidth/300;
        return {
            rows: [
                {
                    cols: [
                        {},
                        {
                            view: 'pager',
                            id: 'partnerPager',
                            size: pagerCnt,
                            width: 80,
                            align: 'right',
                            animate:{
                                type:"slide"
                            },
                            template: '{common.prev()}{common.next()}'
                        },
                    ]
                },
                {
                    view: 'dataview',
                    id: 'partnerDataviewId',
                    width: document.body.clientWidth - collapsedSideBarWidth,
                    // resize: true,
                    borderless: true,
                    margin: 3,
                    gravity: 0,
                    minHeight: 300,
                    xCount: pagerCnt,
                    yCount: 2,
                    type: {
                        width: 300,
                        height: 300,
                        template: "<div class = 'partner_item'><img src='#logoPath#' height='300' width='300' style='object-fit: cover'></div>"
                    },
                    scroll: false,
                    url: 'partners_main',
                    onClick: {
                        "partner_item": function (ev, id) {
                            var item = $$('partnerDataviewId').getItem(id);
                            window.open(item.url);
                        }
                    },
                    pager: 'partnerPager',
                }
            ]
        }
    }
}

function partnersDataview(isBigForm) {
   if (isBigForm) {
       return
   } else {
        return
   }
}

export function partners(isBigForm) {
    return {

        padding: {
            top: 20,
            bottom: 20
        },
        rows: [
            view_header('Партнеры'),
            partnersDataviewWithPager(isBigForm),
            { gravity:0.001 },
        ]
    }
}