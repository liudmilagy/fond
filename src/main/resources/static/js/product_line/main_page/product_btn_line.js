import {setCalculatorValues} from "../../calculator/calculator.js";
import {main_body_width, collapsedSideBarWidth} from "../../general.js";

function createProductBtn(product) {
    if (product.notActive) {
        return {
            id: 'productBtn' + product.id,
            view: 'button',
            autowidth: true,
            css: 'gray_fond',
            value: product.name,
            click: () => {
                $$('productCell' + product.id).show();
                setCalculatorValues(product);
            }
        }
    } else
        return {
            id: 'productBtn' + product.id,
            view: 'button',
            autowidth: true,
            css: 'fond',
            value: product.name,
            click: () => {
                $$('productCell' + product.id).show();
                setCalculatorValues(product);
            }
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
