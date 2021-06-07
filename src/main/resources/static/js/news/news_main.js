import {main_body_width, main_padding, view_header,collapsedSideBarWidth} from "../general.js";

function newsDataview() {
    // var xhr = webix.ajax().sync().get('news_main');
    // var data = JSON.parse(xhr.responseText);

    var width = main_body_width;
    if (document.body.clientWidth < main_body_width) {
        width = document.body.clientWidth - collapsedSideBarWidth;
    }

    return {
        view: 'dataview',
        id: 'newsDataviewId',
        width: width,
        // resize: true,
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
        url: 'news_main',
        onClick:{
            "news_item":function(ev, id){
                var item = $$('newsDataviewId').getItem(id);
                window.location.href = "/news_list/news?hash_id=" + item.hashId;
            }
        }
    }
}

export function news() {
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
            newsDataview(),
            { gravity:0.001 },
        ]
    }
}
