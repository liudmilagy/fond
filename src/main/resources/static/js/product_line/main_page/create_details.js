export function createProductLabel(product) {
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

export function createProductIcon(product) {
    return {
        view: 'template',
        id: 'template' + product.id,
        borderless: true,
        // width: 160,
        // height: 160,
        //css: 'product_big_icon',
        template: "<span class='webix_icon product_icon fas fa-" + product.iconName + "' style='font-size: 120px; color: #6c5b7b'></span>"
    }
}

export function createProductTime(product) {
    return {
        padding: {
            bottom: 10,
        },
        rows: [
            {
                cols: [
                    {view: 'icon',  icon: 'fas fa-calendar-alt', css: 'product_icon'},
                    {view: 'label', 'label': 'На срок',
                        css: 'product_label_title',
                    },
                ]
            },
            {
                cols: [
                    {view: 'icon',  },
                    {view: 'label', label: 'до ' + product.limitation + ' мес.',
                        // css: 'product_label',
                    },
                ]
            },
        ]
    }
}

export function createProductAmountWithDeposit(product) {
    return {
        padding: {
            bottom: 10,
        },
        rows: [
            {
                cols: [
                    {view: 'icon',  icon: 'fas fa-wallet',  css: 'product_icon'},
                    {view: 'label', 'label': 'Сумма (с залогом), руб.',
                        css: 'product_label_title'
                    },
                ]
            },
            {
                cols: [
                    {view: 'icon',  },
                    {view: 'label', label: 'от '+ webix.i18n.numberFormat(product.minAmountWithDeposit) + ' до ' + webix.i18n.numberFormat(product.maxAmountWithDeposit),
                    },
                ]
            },
        ]
    }
}

export function createProductAmountWithoutDeposit(product) {
    return {
        padding: {
            bottom: 10,
        },
        rows: [
            {
                cols: [
                    {view: 'icon',  icon: 'fas fa-wallet',
                        css: 'product_icon'
                    },
                    {view: 'label', 'label': 'Сумма (без залога), руб.',
                        css: 'product_label_title'
                    },
                ]
            },
            {
                cols: [
                    {view: 'icon',  },
                    {view: 'label', label: 'от '+ webix.i18n.numberFormat(product.minAmountWithoutDeposit) + ' до ' + webix.i18n.numberFormat(product.maxAmountWithoutDeposit),
                        // css: 'product_label_title',
                    },
                ]
            },
        ]
    }
}

export function createProductTextRateWithDeposit(product) {
    return {
        padding: {
            bottom: 10,
        },
        rows: [
            {
                cols: [
                    {view: 'icon',  icon: 'fas fa-percent',  css: 'product_icon'},
                    {view: 'label', 'label': product.textRateWithDeposit,
                        css: 'product_label_title'
                    },
                ]
            },
        ]
    }
}

export function createProductTextRateWithoutDeposit(product) {
    return {
        rows: [
            {
                cols: [
                    {view: 'icon',  icon: 'fas fa-percent',  css: 'product_icon'},
                    {view: 'label', 'label': product.textRateWithoutDeposit,
                        css: 'product_label_title'
                    },
                ]
            },
        ]
    }
}