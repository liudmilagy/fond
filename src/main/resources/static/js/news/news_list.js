import {view_header} from "../general.js";

var news_url = 'news_list_pager'

//define proxy
webix.proxy.idata = {
    $proxy:true,
    load:function(view, params){
        this._attachHandlers(view);

        var url = this.source;
        url += (url.indexOf("?") == -1 ) ? "?": "&";

        var count = params?params.count:view.config.datafetch || 0;
        var start = params?params.start:0;

        //url will look like "../data.php?count=50&start=51"
        url += "count="+count;
        url += start?"&start="+start:"";

        return webix.ajax(url).then(webix.bind(function(data) {
            /*
                here the url outputs data in a classic format {data:[], pos:0, total_count:999}
                we take only data arry from it to emulate dynamic loading without knowing the total count
            */
            data = data.json().data;
            this._checkLoadNext(data);
            return data;
        }, this));
    },
    _checkLoadNext:function(data){
        if(!data.length)
            this._dontLoadNext = true;
    },
    _attachHandlers:function(view){
        var proxy = this;

        if(view.config.columns)
            view.attachEvent("onScrollY", function(){ proxy._loadNext(this); });
        else
            view.attachEvent("onAfterScroll", function(){ proxy._loadNext(this); });

        //attach handlers once
        this._attachHandlers = function(){};
    },
    _loadNext:function(view){
        var contentScroll =  view.getScrollState().y+view.$view.clientHeight;
        var node = view.getItemNode(view.getLastId());
        var height = view.config.rowHeight || view.type.height;

        if(node && contentScroll>=node.offsetTop+height && !this._dontLoadNext){
            view.loadNext(view.config.datafetch, view.count()+1);
        }
    }
};

var options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
};

const bigNewsList = {
    id: 'newsListId',
    rows: [
        {
            // view: 'label',
            id: 'newsListsHeaderId',
            template: 'Новости',
            css: 'other_tab_main_title',
            borderless: true,
            align: 'center',
            autoheight: true,
        },
        {gravity: 0.04},
        {
            view: "dataview",
            id: "newsListDataview",
            margin: 20, paddingX: 10,
            css: 'fond_bg2',
            // scroll: 'y',
            scroll: false,
            borderless: true,
            template: "<div class='news_item'>" +
                "<img src='#attachmentPath#' height='225' width='300' style='object-fit: cover'> <br>" +
                "#heading# <br>" +
                "Дата публикации: #startTime#"+
                "</div>",
            xCount: 4,
            type: {
                // Если height поставить auto,
                // то скроллинг с динамической загрузкой новостей не будет работать
                height: 350,
                width: "auto",
                float: "right"
            },
            datafetch: 10,
            url: 'idata->' + news_url,
            onClick:{
                "news_item":function(ev, id){
                    var item = $$('newsListDataview').getItem(id);
                    window.location.href = "/news_list/news?hash_id=" + item.hashId;
                }
            },
            on: {
                onAfterLoad: () => {
                    var el_count = $$('newsListDataview').count();
                    if ( el_count != 0) {
                        var xCount = $$('newsListDataview').config.xCount;
                        var rowCount = Math.round(el_count/xCount);
                        var dataviewHeight = 350 * rowCount;
                        if ( $$('newsListDataview').$height < dataviewHeight) {
                            $$('newsListDataview').config.height = dataviewHeight;
                            $$('newsListDataview').resize();
                        }
                    }
                },
            }
        },
        {
            view: 'pager',
            id: 'Pager',
            height: 38,
            size: 25,
            group: 5,
            template: '{common.first()}{common.prev()}{common.pages()}{common.next()}{common.last()}'
        }
    ]
}

const smallNewsList = {
    id: 'newsListId',
    rows: [
        {
            // view: 'label',
            id: 'newsListsHeaderId',
            template: 'Новости',
            css: 'other_tab_main_title',
            borderless: true,
            align: 'center',
            autoheight: true,
        },
        {
            view: "dataview",
            id: "newsListDataview",
            margin: 20, paddingX: 10,
            scroll: 'y',
            borderless: true,
            template: "<div class='news_item'>" +
                "<img src='#attachmentPath#' height='187.5' width='250' style='object-fit: cover'> <br>" +
                "#heading# <br>" +
                "Дата публикации: #startTime#"+
                "</div>",
            xCount: 1,
            type: {
                // Если height поставить auto,
                // то скроллинг с динамической загрузкой новостей не будет работать
                height: 350,
                width: "auto",
                float: "right"
            },
            datafetch: 10,
            url: 'idata->' + news_url,
            onClick:{
                "news_item":function(ev, id){
                    var item = $$('newsListDataview').getItem(id);
                    window.location.href = "/news_list/news?hash_id=" + item.hashId;
                }
            }
        },
        {
            view: 'pager',
            id: 'Pager',
            height: 38,
            size: 25,
            group: 5,
            template: '{common.first()}{common.prev()}{common.pages()}{common.next()}{common.last()}'
        }
    ]
}

export function newsList(isBigForm) {
    if (isBigForm) {
        return bigNewsList;
    } else {
       return smallNewsList;
    }
}
