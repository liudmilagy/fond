import {main_body_width, main_padding, view_header,collapsedSideBarWidth} from "../general.js";

function newsDataview(isBigForm, pagerCnt) {
   if (isBigForm) {
       return {
           view: 'dataview',
           id: 'newsDataviewId',
           width: main_body_width,
           // resize: true,
           sizeToContent:true,
           css: {
               'border': 'transparent'
           },
           borderless: true,
           margin: 3,
           gravity:0,
           minHeight: 350,
           type:{
               width: 300,
               height: 350,
               template: "<div class = 'news_item'><img src='#attachmentPath#' height='225' width='300' style='object-fit: cover; '><br>" +
                   "#startTime#<br>"+
                   "#heading#</div>",
           },
           scroll: false,
           pager: 'newsPager',
           url: 'news_main_mobile/'+pagerCnt,
           onClick:{
               "news_item":function(ev, id){
                   var item = $$('newsDataviewId').getItem(id);
                   window.location.href = "/news_list/news?hash_id=" + item.hashId;
               }
           }
       }
   } else  {

       return {
           view: 'dataview',
           id: 'newsDataviewId',
           width: document.body.clientWidth - collapsedSideBarWidth,
           // resize: true,
           // sizeToContent:true,
           css: {
               'border': 'transparent'
           },
           xCount: pagerCnt,
           borderless: true,
           // margin: 3,
           // gravity:0,
           minHeight: 350,
           type:{
               width: 300,
               height: 350,
               template: "<div class = 'news_item'><img src='#attachmentPath#' height='225' width='300' style='object-fit: cover; '><br>" +
                   "#startTime#<br>"+
                   "#heading#</div>",
           },
           scroll: false,
           pager: 'newsPager',
           url: 'news_main_mobile/'+pagerCnt,
           onClick:{
               "news_item":function(ev, id){
                   var item = $$('newsDataviewId').getItem(id);
                   window.location.href = "/news_list/news?hash_id=" + item.hashId;
               }
           }
       }
   }

}

export function news(isBigForm) {
    var pagerCnt = 4;
    if (!isBigForm) {
        pagerCnt = Math.floor((document.body.clientWidth - collapsedSideBarWidth)/300);
        if (pagerCnt == 0) {
            pagerCnt = 1;
        }
    }
    return {
        // view: 'form',
        // width: main_body_width,
        borderless: true,
        padding: {
            top: 20,
            bottom: 20
        },
        rows: [
            view_header('Новости'),
            {
                cols: [
                    {},
                    {
                        view: 'pager',
                        id: 'newsPager',
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
            newsDataview(isBigForm, pagerCnt),
            { gravity:0.001 },
        ]
    }
}
