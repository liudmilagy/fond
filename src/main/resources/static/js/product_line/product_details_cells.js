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
        // autoheight:true,
        height: '100%',
        rows: [
            label,
            time,
            amount,
        ]
    }
}

export function createProductDetailsCells(data) {
    var productDetailsCells = [];

    for (var k in data) {
        var detail = createProductDetails(data[k]);
        productDetailsCells.push(detail);
    }

    return productDetailsCells;
}
