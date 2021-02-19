function getSideBarData() {
    var data = [{ id: 'References', icon: 'fas fa-book', value: 'Справочники',}];     data.push({ id: 'Rkk', icon: 'fas fa-file-alt',   value: 'РКК', });
        data.push({ id: 'ArchivedRkk', icon: 'fas fa-folder', value: 'Архив РКК'})
        data.push({ id: 'DeletedRkk', icon: 'fas fa-trash-alt', value: 'Удаленные РКК'});

    return data;
}

const sideBar = {
    view: 'sidebar',
    id: 'sidebar',
    css: 'webix_dark',
    data: getSideBarData(),

}

var productLineBtnData = [
    {view: 'button', autowidth: true, value: 'Старт'},
    {view: 'button', autowidth: true, value: 'Моногород'},
    {view: 'button', autowidth: true, value: 'Моногород приоритет'},
    {view: 'button', autowidth: true, value: 'Приоритет'},
    {view: 'button', autowidth: true, value: 'Бизнес-оборот'},
    {view: 'button', autowidth: true, value: 'Бизнес'},
    {view: 'button', autowidth: true, value: 'Рефинансирование'},
    {view: 'button', autowidth: true, value: 'Экспресс'},
]

var productLineBtns = {
    view: 'flexlayout',
    margin: 10,
    rows: productLineBtnData
}

var productLine = {

}

const mainPage = {
    id: 'mainPageId',
    cols: [
        {
            responsive: 'mainPageId',
            rows: [
                productLineBtns,
            ]
        }
    ]
}

// webix.ready(function() {
//     let layout = webix.ui({
//         rows: [
//             productLineBtns,
//             // {
//             //     cols: [
//             //         sideBar,
//             //         {
//             //             id: 'content'
//             //         }
//             //     ],
//             // }
//         ]
//     })
//
//     webix.event(window, "resize", function (event) {
//         layout.define("width",document.body.clientWidth);
//         layout.define("height",window.innerHeight);
//         layout.resize();
//     });
//
// })

webix.ready(function() {
    let layout = webix.ui(mainPage)

    webix.event(window, "resize", function (event) {
        layout.define("width",document.body.clientWidth);
        layout.define("height",window.innerHeight);
        layout.resize();
    });

})
