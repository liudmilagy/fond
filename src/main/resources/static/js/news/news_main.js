import {main_body_width, main_padding, view_header} from "../general.js";

function newsDataview() {
    var xhr = webix.ajax().sync().get('news_main');
    var data = JSON.parse(xhr.responseText);

    return {
        view: 'dataview',
        id: 'newsDataviewId',
        width: main_body_width,
        // resize: true,
        borderless: true,
        margin: 3,
        gravity:0,
        minHeight: 350,
        type:{
            width: 300,
            height: 400,
            template: "<div class = 'news_item'><img src='#attachmentPath#' height='225' width='300' style='object-fit: cover'><br>" +
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
        // borderless: true,
        rows: [
            view_header('Новости'),
            newsDataview(),
            { gravity:0.001 },
        ]
    }
}