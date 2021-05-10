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

function generateNewsRow(obj) {
    // var startTime = obj.startTime ? new Date(obj.startTime) : "";
    // let startTimeString = startTime.toLocaleString("ru", options)

    return
    "<div class='news_item'>" +
    "<img src='#attachmentPath#' height='225' width='300' style='object-fit: cover'>" +
    "#heading# <br>" +
    "Дата публикации: #startTime#"+
    "</div>"
}

export const newsList = {
    id: 'newsListId',
    rows: [
        {
            view: "dataview",
            id: "newsListDataview",
            margin: 20, paddingX: 10,
            // scroll: 'y',
            borderless: true,
            template: "<div class='news_item'>" +
                "<img src='#attachmentPath#' height='225' width='300' style='object-fit: cover'>" +
                "#heading# <br>" +
                "Дата публикации: #startTime#"+
                "</div>",
            xCount: 4,
            type: {
                // Если height поставить auto,
                // то скроллинг с динамической загрузкой новостей не будет работать
                height: 300,
                width: "auto",
                float: "right"
            },
            datafetch: 10,
            scroll: false,
            url: 'idata->' + news_url,
            onClick: {
                "news_item": function (ev, id) {
                    // openArchiveNews(ev, id);
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