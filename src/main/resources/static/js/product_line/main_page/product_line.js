import {createProductBtnLine} from "./product_btn_line.js";
import {createProductDetailsCells} from "./product_details_cells.js";
import {main_padding, main_body_width, getOtherWidth, view_header} from "../../general.js";

export function productLine() {
    var xhr = webix.ajax().sync().get('product_list_for_calculator');
    var data = JSON.parse(xhr.responseText);

    var productBtnLine = createProductBtnLine(data);
    var productDetailCells = createProductDetailsCells(data);

    return {
        // cols: [
            // { width: getOtherWidth()},
            // {
                view: 'form',
                width: main_body_width,
                // resize: true,
                borderless: true,
                margin: 3,
                gravity:0,
                // autoheight: true,
                // type:{height:"auto"},
                minHeight: 350,
                padding: main_padding,
                rows: [
                    view_header('Продуктовая линейка'),
                    productBtnLine,
                    {
                        id: 'productViews',
                        cells: productDetailCells,
                    },
                    { gravity:0.001 },
                    // {template: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewbox=\"0 0 1280 140\"><path d=\"M0 51.76c36.21-2.25 77.57-3.58 126.42-3.58 320 0 320 57 640 57 271.15 0 312.58-40.91 513.58-53.4V0H0z\" fill-opacity=\".2\"/><path d=\"M0 24.31c43.46-5.69 94.56-9.25 158.42-9.25 320 0 320 89.24 640 89.24 256.13 0 307.28-57.16 481.58-80V0H0z\" fill-opacity=\".8\"/><path d=\"M0 0v3.4C28.2 1.6 59.4.59 94.42.59c320 0 320 84.3 640 84.3 285 0 316.17-66.85 545.58-81.49V0z\"/></svg>"}
                ]
        //         },
        //     {width: getOtherWidth()}
        // ]

    }

}