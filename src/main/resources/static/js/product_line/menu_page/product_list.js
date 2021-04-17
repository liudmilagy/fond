import {getOtherWidth, view_header, changeContentView} from "../../general.js";
import {productInfo} from "./product_info.js";

const productTable = {
        view: 'datatable',
        id: 'productTableId',
        autoheight: true,
        scroll: false,
        select: 'row',
        columns: [
            { id: 'index', header: '',},
            {
                id: 'name',
                header: 'Продукт',
                fillspace: 2,
                adjust: true,
            },
            {
                id: 'time',
                header: 'Срок займа',
                fillspace: 1,
                adjust: true,
            },
            {
                id: 'amount',
                header: 'Сумма займа',
                fillspace: 2,
                adjust: true,
            },
        ],
        data: [],
        url: 'product_line',
        on:{
            'data->onStoreUpdated': function(){
                this.data.each(function(obj, i){
                    obj.index = i + 1;
                });
            },
            onItemClick: function(id, e, node) {
                let row = $$('productTableId').getItem(id);
                webix.ui(productInfo, $$('productListId'));
                // $$('productInfoId').parse(row);
                $$('labelId').setValue(row.name);
                $$('textHtmlId').setHTML(row.htmlText);
            }
        },
    }

export const productList = {
    id: 'productListId',
    cols: [
        {width: getOtherWidth()},
        {
            rows:[
                {gravity: 0.1},
                view_header('Продуктовая линейка'),
                {gravity: 0.04},
                productTable,
                {},
            ]
        },
        {width: getOtherWidth()},
    ]
}
