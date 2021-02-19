var productLineBtnData = [
    {view: 'button', autowidth: true, css: 'fond', value: 'Старт'},
    {view: 'button', autowidth: true, css: 'fond', value: 'Моногород'},
    {view: 'button', autowidth: true, css: 'fond', value: 'Моногород приоритет'},
    {view: 'button', autowidth: true, css: 'fond', value: 'Приоритет'},
    {view: 'button', autowidth: true, css: 'fond', value: 'Бизнес-оборот'},
    {view: 'button', autowidth: true, css: 'fond', value: 'Бизнес'},
    {view: 'button', autowidth: true, css: 'fond', value: 'Рефинансирование'},
    {view: 'button', autowidth: true, css: 'fond', value: 'Экспресс'},
]

var productLineBtns = {
    view: 'flexlayout',
    gravity:0,
    margin: 10,
    rows: productLineBtnData
}

var productNameLabel = {
    cols: [
        {view: 'icon',  icon: 'fas fa-grip-lines-vertical'},
        {view: 'label', label: 'Label'}
    ]
}


var productTime = {
    cols: [
        {view: 'icon',  icon: 'fas fa-calendar-alt'},
        {
            rows: [
                { view: 'label', label: 'На срок'},
                { view: 'label', label: 'От 6 до 24 месяцев'},
            ]
        },
    ]
}

var productTime = {
    rows: [
        {
            cols: [
                {view: 'icon',  icon: 'fas fa-calendar-alt'},
                { view: 'label', label: 'На срок'},
            ]
        },
        {
            cols: [
                { view: 'icon',  },
                { view: 'label', label: 'От 6 до 24 месяцев'},
            ]
        },
    ]

var productDetails = {
    rows: [
        productNameLabel,
        productTime,
        productAmount,
    ]
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
                productDetails
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
