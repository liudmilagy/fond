import {createProductBtnLine} from "./product_btn_line.js";
import {createProductDetailsCells} from "./product_details_cells.js";
import {
    main_padding,
    main_body_width,
    getOtherWidth,
    view_header,
    collapsedSideBarWidth,
    view_header_left
} from "../../general.js";

export function productLine(data, isBigForm) {

    // webix.ajax().get('product_list_for_calculator').then(function (xhr) {
    //     var data = xhr.json();
        // var xhr = webix.ajax().sync().get('product_list_for_calculator');
        // var data = JSON.parse(xhr.responseText);

        // var isBigForm = true;
        // if (document.body.clientWidth < main_body_width) {
        //     width = document.body.clientWidth - collapsedSideBarWidth;
        //     isBigForm = false;
        // }
        var width = main_body_width;
        if (!isBigForm) {
            width = document.body.clientWidth - collapsedSideBarWidth;
        }

        var productBtnLine = createProductBtnLine(data);
        var productDetailCells = createProductDetailsCells(data, isBigForm);

        return {
            view: 'form',
            id: 'productLineId',
            width: width,
            resize: true,
            borderless: true,
            margin: 3,
            gravity: 0,
            adjust: true,
            // autoheight: true,
            // type:{height:"auto"},
            // minHeight: 370,
            padding: main_padding,
            // body: {
                rows: [
                    {
                        view: 'template',
                        id: 'productLineHeaderId',
                        // type: 'header',
                        template: 'Продуктовая линейка',
                        css: 'product_label_main_title_left',
                        autoheight: true,
                        borderless: true,
                    },
                    productBtnLine,
                    {
                        id: 'productViews',
                        cells: productDetailCells,
                    },
                    // {gravity: 0.001},
                ],
            // }
        }
    // })
}
