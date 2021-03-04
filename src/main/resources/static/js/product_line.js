import {view_header} from "./general.js";

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
        // type: 'clean',
        height: 200,
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
        view: 'form',
        // resize: true,
        borderless: true,
        margin: 3,
        gravity:0,
        rows: [
            view_header('Продуктовая линейка'),
            productLineBtns,
            {
                id: 'productViews',
                cells: productDetailsCells,
            },
        ]
    }
    return productLine;
}

export const productLine = createProductLine();

// const panels = $$('productViews').getChildViews();
// panels.forEach((panel) => {
//     let innerHeight;
//     let height = panel.getParentView().config.cellHeight;
//     if (panel.getChildViews()[1]) {
//         innerHeight = panel.getChildViews()[1].config.height;
//     } else {
//         innerHeight = panel.getChildViews()[0].config.height;
//     }
//     // console.log(panel.getChildViews()[0]);
//     let coef = Math.ceil(innerHeight / height);
//     panel.define({dy: coef});
//     panel.resize();
// })