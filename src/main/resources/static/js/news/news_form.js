webix.html.addStyle(".listStyle {float:left; margin:20px;} " +
    "a{\n" +
    "\n" +
    "   text-decoration: none;\n" +
    "   color: #000000;" +
    "   }" +
    "a:hover{\n" +
    "\n" +
    "   color: #0056b3; \n" +
    "   }" +
    "a.link{\n" +
    "\n" +
    "   text-decoration: none;\n" +
    "   color: #005cbf;" +
    "   }" +
    "a.link:hover{\n" +
    "\n" +
    "   color: #e83e8c; \n" +
    "   }" +
    ".item{\n" +
    "\n" +
    "    margin:10px 5px;\n" +
    "    padding:10px 10px;\n" +
    "  }" +
    ".item_link{\n" +
    "\n" +
    "    margin:0px 15px;\n" +
    "  }" +
    ".item_title{\n" +
    "\n" +
    "    font:bold 14px/16px GraphikCy-Semibold;\n" +
    "    display: block;\n" +
    "    margin:10px 5px;\n" +
    "    padding:10px;\n" +
    "  }" +
    ".item_title:hover{\n" +
    "\n" +
    "    font:bold 14px/16px GraphikCy-Semibold;\n" +
    "    display: block;\n" +
    "    margin:10px 5px;\n" +
    "    padding:10px;\n" +
    "    color: #0056b3; \n" +
    "  }" +
    ".item_big_title{\n" +
    "\n" +
    "    font:bold 24px/26px;\n" +
    "    display: block;\n" +
    "    margin:10px 5px;\n" +
    "    padding:10px;\n" +
    "  }" +
    ".item_big_title:hover{\n" +
    "\n" +
    "    font:bold 24px/26px;\n" +
    "    display: block;\n" +
    "    margin:10px 5px;\n" +
    "    padding:10px;\n" +
    "    color: #0056b3; \n" +
    "  }" +
    ".item_label{\n" +
    "\n" +
    "    font:bold 12px/14px;\n" +
    "    text-align:right;\n" +
    "    display: block;\n" +
    "    margin:10px 5px;\n" +
    "    padding:10px;\n" +
    "  }" +
    ".class_border{\n" +
    "\n" +
    "    border-bottom:1px solid #c3c5c9;\n" +
    "  }");

export const newsForm = {
    id: 'newsFormId',
    borderless: true,
    rows: [
        {
            view:'template',
            id: 'newsFormTemplateId',
            // scroll: 'xy',
            template: '#newsTemplate#'
        }
    ]
}

export function generateNewsTemplate(obj) {
    var options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    };

    let obj_news = obj['news']
    let news_files = obj['newsFiles']
    if (obj_news.hashId != null) {
        var startTime =obj_news.startTime ? new Date(obj_news.startTime) : "";
        let startTimeString = startTime.toLocaleString("ru", options)
        let htmlcode =  "<div>" +
            "<span class = 'item_big_title'>" +
            // "<a href = \"news?hash_id=" + obj_news.hashId + "\"'>" +
            obj_news.heading +
            // "</a>" +
            "</span>" +
            "<div class='item'>" +
            obj_news.htmlText +
            "</div>";

        for (var i in news_files) {
            let newsFilePath = "/" + news_files[i].fileName + news_files[i].fileExtension
            htmlcode = htmlcode + "<div class='item_link'><a class='link' href='" + newsFilePath + "'download=''><i class='mdi mdi-download'></i>"
                + news_files[i].originalFileName + "</a></div>"
        }
        return htmlcode +  "<span class = 'item_label'>" +
            "Дата публикации: " + startTimeString +
            "</span>" +
            "</div>"
    }
    else {
        return ""
    }
}


// let item = $$('newsArchiveDataview').getItem(id);
// var xhr = webix.ajax().sync().get('newsform/' + item.hashId);
// var jsonResponse = JSON.parse(xhr.responseText);
// newsTemplate = generateNewsTemplate(jsonResponse)
// webix.ui(newsForm, $$('archiveNewsId'));
// $$('newsFormTemplateId').parse({
//     'newsTemplate': newsTemplate
// });