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

export function createProductBtnLine(data) {
    var productLineBtnData = [];

    for (var k in data) {
        var btn = createProductBtn(data[k]);
        productLineBtnData.push(btn);
   }

    var productLineBtns = {
        view: 'flexlayout',
        gravity:0,
        margin: 10,
        rows: productLineBtnData,
    }

    return productLineBtns;
}
