import {getOtherWidth, view_header, changeContentView, main_body_width} from "../../general.js";
import {productInfo} from "./product_info.js";
import {productDataForm} from "./product_data_form.js";

function getProductTableColumns() {
    var columnsData = []
    if (document.body.clientWidth < main_body_width) {
        columnsData = [
            { id: 'index', header: '',},
            {
                id: 'name',
                header: 'Продукт',
                fillspace: 2,
                adjust: true,
            },
        ]
    } else {
        columnsData = [
            {id: 'index', header: '',},
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
        ]
    }
    return columnsData;
}

const productTable = {
        view: 'datatable',
        id: 'productTableId',
        autoheight: true,
        scroll: false,
        select: 'row',
        columns:getProductTableColumns(),
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
                window.location.href = "/product_list/product/" + row.id;
            }
        },
    }

export const productList = {
    id: 'productListId',
    rows:[
        // view_header('Продуктовая линейка'),
        {
            view: 'template',
            template: 'Продуктовая линейка',
            id: 'headerId',
            css: 'other_tab_main_title',
            borderless: true,
            align: 'center',
            autoheight: true,
        },
        productTable,
        {height: 72}
    ]
}
