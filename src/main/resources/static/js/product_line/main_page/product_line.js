import {createProductBtnLine} from "./product_btn_line.js";
import {createProductDetailsCells} from "./product_details_cells.js";
import {main_padding, main_body_width, getOtherWidth, view_header, collapsedSideBarWidth} from "../../general.js";

export function productLine() {
    var xhr = webix.ajax().sync().get('product_list_for_calculator');
    var data = JSON.parse(xhr.responseText);

    var productBtnLine = createProductBtnLine(data);
    var productDetailCells = createProductDetailsCells(data);

    var width = main_body_width;
    if (document.body.clientWidth < main_body_width) {
        width = document.body.clientWidth - collapsedSideBarWidth;
    }

    return {
                view: 'form',
                width: width,
                resize: true,
                borderless: true,
                margin: 3,
                gravity:0,
                // autoheight: true,
                // type:{height:"auto"},
                minHeight: 370,
                padding: main_padding,
                rows: [
                    view_header('Продуктовая линейка'),
                    productBtnLine,
                    {
                        id: 'productViews',
                        cells: productDetailCells,
                    },
                    { gravity:0.001 },
                ]
    }

}
