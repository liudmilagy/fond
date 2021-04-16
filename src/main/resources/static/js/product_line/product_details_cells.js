function createProductLabel(product) {
    return  {
        cols: [
            // {view: 'icon',  icon: 'fas fa-grip-lines-vertical'},
            { gravity: 0.01},
            {
                id: 'productLabel' + product.id,
                view: 'label',
                css: 'product_label_main_title',
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
                    {view: 'icon',  icon: 'fas fa-calendar-alt', css: 'product_icon'},
                    {view: 'label', 'label': 'На срок', css: 'product_label_title',},
                ]
            },
            {
                cols: [
                    {view: 'icon',  },
                    {view: 'label', label: product.time,  css: 'product_label',},
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
                    {view: 'icon',  icon: 'fas fa-wallet',  css: 'product_icon'},
                    {view: 'label', 'label': 'Сумма', css: 'product_label_title'},
                ]
            },
            {
                cols: [
                    {view: 'icon',  },
                    {view: 'label', label: product.amount,  css: 'product_label',},
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
