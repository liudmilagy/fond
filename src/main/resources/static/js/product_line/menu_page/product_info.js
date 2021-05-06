const productHtml = {
    view: 'template',
    id: 'textHtmlId',
    // scroll: true,
    borderless: true,
    autoheight: true,
}

export const productInfo = {
    view: 'scrollview',
    // autowidth: true,
    // autoheight: true,
    id: 'productInfoTab',
    scroll: 'xy',
    body: {
        rows: [
            {view: 'label', id: 'labelId', hidden: true},
            productHtml,
        ]
    }
}