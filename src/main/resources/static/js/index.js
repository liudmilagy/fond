var data = [
    {id: 1, name: 'Старт', time: 'до 24 месяцев', amount: 'от 50 000 до 500 000'},
    {id: 2, name: 'Моногород', time: 'до 24 месяцев', amount: 'от 50 000 до 1 500 000'},
    {id: 3, name: 'Моногород приоритет', time: 'до 24 месяцев', amount: 'от 50 000 до 1 500 000'},
    {id: 4, name: 'Приоритет', time: 'до 24 месяцев', amount: 'от 50 000 до 2 000 000'},
    {id: 5, name: 'Бизнес-оборот', time: 'до 24 месяцев', amount: 'от 50 000 до 3 000 000'},
    {id: 6, name: 'Бизнес', time: 'до 36 месяцев', amount: 'от 50 000 до 3 000 000'},
    {id: 7, name: 'Рефинансирование', time: 'до 36 месяцев', amount: 'от 50 000 до 3 000 000'},
    {id: 8, name: 'Экспресс', time: 'до 18 месяцев', amount: 'от 30 000 до 100 000'},

]

function createProductBtn(product) {
    return {
        id: 'productBtn' + product.id,
        view: 'button',
        autowidth: true,
        css: 'fond',
        value: product.name,
        click: () => $$('productCell' + product.id).show(),
    }
}

function createProductLabel(product) {
    return  {
        cols: [
            {view: 'icon',  icon: 'fas fa-grip-lines-vertical'},
            {
                id: 'productLabel' + product.id,
                view: 'label',
                label: product.name
            }
        ]
    }
}

function createProductTime(product) {
    return {
        rows: [
            {
                cols: [
                    {view: 'icon',  icon: 'fas fa-calendar-alt'},
                    {view: 'label', 'label': 'На срок'},
                ]
            },
            {
                cols: [
                    {view: 'icon',  },
                    {view: 'label', label: product.time,},
                ]
            },
        ]
    }
}

function createProductAmount(product) {
    return {
        rows: [
            {
                cols: [
                    {view: 'icon',  icon: 'fas fa-wallet'},
                    {view: 'label', 'label': 'Сумма'},
                ]
            },
            {
                cols: [
                    {view: 'icon',  },
                    {view: 'label', label: product.amount,},
                ]
            },
        ]
    }
}

function createProductDetails(product) {
    var label = createProductLabel(product);
    var time = createProductTime(product);
    var amount = createProductAmount(product);

    return {
        id: 'productCell' + product.id,
        type: 'clean',
        rows: [
            label,
            time,
            amount,
        ]
    }
}

function createProductLine() {
    var productLineBtnData = [];
    var productDetailsCells = [];

    for (var k in data) {
        var btn = createProductBtn(data[k]);
        productLineBtnData.push(btn);

        var detail = createProductDetails(data[k]);
        productDetailsCells.push(detail);
    }

    var productLineBtns = {
        view: 'flexlayout',
        gravity:0,
        margin: 10,
        rows: productLineBtnData,
    }

    var productLine = {
        resize: true,
        // margin: 10,
        rows: [
            {
                id: 'productBtnId',
                cols: [
                    {
                        responsive: 'productBtnId',
                        rows: [
                            productLineBtns,
                        ]
                    }
                ]
            },
            {
                id: 'productViews',
                cells: productDetailsCells,
            },
            {}
        ]
    }
    return productLine;
}

// var productLineBtnData = [
//     {view: 'button', autowidth: true, css: 'fond', value: 'Старт'},
//     {view: 'button', autowidth: true, css: 'fond', value: 'Моногород'},
//     {view: 'button', autowidth: true, css: 'fond', value: 'Моногород приоритет'},
//     {view: 'button', autowidth: true, css: 'fond', value: 'Приоритет'},
//     {view: 'button', autowidth: true, css: 'fond', value: 'Бизнес-оборот'},
//     {view: 'button', autowidth: true, css: 'fond', value: 'Бизнес'},
//     {view: 'button', autowidth: true, css: 'fond', value: 'Рефинансирование'},
//     {view: 'button', autowidth: true, css: 'fond', value: 'Экспресс'},
// ]

// var productLineBtns = {
//     view: 'flexlayout',
//     gravity:0,
//     margin: 10,
//     rows: createProductLine(),
// }
//
// var productNameLabel = {
//     cols: [
//         {view: 'icon',  icon: 'fas fa-grip-lines-vertical'},
//         {view: 'label', label: 'Label'}
//     ]
// }
//
//
// var productTime = {
//     cols: [
//         {view: 'icon',  icon: 'fas fa-calendar-alt'},
//         {
//             rows: [
//                 { view: 'label', label: 'На срок'},
//                 { view: 'label', label: 'От 6 до 24 месяцев'},
//             ]
//         },
//     ]
// }
//
// var productAmount = {
//     rows: [
//         {
//             cols: [
//                 {view: 'icon', icon: 'fas fa-calendar-alt'},
//                 {view: 'label', label: 'На срок'},
//             ]
//         },
//         {
//             cols: [
//                 {view: 'icon',},
//                 {view: 'label', label: 'От 6 до 24 месяцев'},
//             ]
//         },
//     ]
// }
//
// var productDetails = {
//     type: 'clean',
//     rows: [
//         productNameLabel,
//         productTime,
//         productAmount,
//     ]
// }

// const mainPage = {
//     id: 'mainPageId',
//     cols: [
//         {
//             responsive: 'mainPageId',
//             rows: [
//                 productLineBtns,
//                 productDetails,
//             ]
//         }
//     ]
// }

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
    let layout = webix.ui(createProductLine());

    webix.event(window, "resize", function (event) {
        layout.define("width",document.body.clientWidth);
        layout.define("height",window.innerHeight);
        layout.resize();
    });

})
