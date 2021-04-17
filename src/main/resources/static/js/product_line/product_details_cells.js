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
                    {view: 'label', label: 'до ' + product.limitation + ' мес.',  css: 'product_label',},
                ]
            },
        ]
    }
}

function createProductAmountWithDeposit(product) {
    return {
        rows: [
            {
                cols: [
                    {view: 'icon',  icon: 'fas fa-wallet',  css: 'product_icon'},
                    {view: 'label', 'label': 'Сумма (с залогом)', css: 'product_label_title'},
                ]
            },
            {
                cols: [
                    {view: 'icon',  },
                    {view: 'label', label: 'от '+ product.minAmountWithDeposit + ' до ' + product.maxAmountWithDeposit,  css: 'product_label',},
                ]
            },
        ]
    }
}

function createProductAmountWithoutDeposit(product) {
    return {
        rows: [
            {
                cols: [
                    {view: 'icon',  icon: 'fas fa-wallet',  css: 'product_icon'},
                    {view: 'label', 'label': 'Сумма (без залога)', css: 'product_label_title'},
                ]
            },
            {
                cols: [
                    {view: 'icon',  },
                    {view: 'label', label: 'от '+ product.minAmountWithoutDeposit + ' до ' + product.maxAmountWithoutDeposit,  css: 'product_label',},
                ]
            },
        ]
    }
}

function createProductTextRateWithDeposit(product) {
    return {
        rows: [
            {
                cols: [
                    {view: 'icon',  icon: 'fas fa-percent',  css: 'product_icon'},
                    {view: 'label', 'label': product.textRateWithDeposit, css: 'product_label'},
                ]
            },
        ]
    }
}

function createProductTextRateWithoutDeposit(product) {
    return {
        rows: [
            {
                cols: [
                    {view: 'icon',  icon: 'fas fa-percent',  css: 'product_icon'},
                    {view: 'label', 'label': product.textRateWithoutDeposit, css: 'product_label'},
                ]
            },
        ]
    }
}

function createProductDetails(product) {
    var label = createProductLabel(product);
    var time = createProductTime(product);
    var amountWithDeposit = createProductAmountWithDeposit(product);
    var amountWithoutDeposit = createProductAmountWithoutDeposit(product);
    var textRateWithDeposit = createProductTextRateWithDeposit(product);
    var textRateWithoutDeposit = createProductTextRateWithoutDeposit(product);

    return {
        id: 'productCell' + product.id,
        // type: 'clean',
        // autoheight:true,
        height: '100%',
        rows: [
            label,
            time,
            {
                cols: [
                    {
                        rows: [
                            amountWithoutDeposit,
                            textRateWithoutDeposit
                        ]
                    },
                    {
                        rows: [
                            amountWithDeposit,
                            textRateWithDeposit,
                        ]
                    },
                    {}
                ]
            },
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
