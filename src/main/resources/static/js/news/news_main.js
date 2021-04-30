import {main_body_width, main_padding, view_header} from "../general.js";

export function news() {
    // var xhr = webix.ajax().sync().get('product_list_for_calculator');
    // var data = JSON.parse(xhr.responseText);

    return {
        view: 'dataview',
        width: main_body_width,
        // resize: true,
        borderless: true,
        margin: 3,
        gravity:0,
        minHeight: 350,
        type:{
            width: 400,
            height: 500,
            template:"<img src='#img#' width = 400 height=300><br>" +
                "#title#",
        },
        scroll: false,
        data:[
            { id:1, title:"image", img:"http://qnimate.com/wp-content/uploads/2014/03/images2.jpg"},
            { id:2, title:"cat",img:"https://cdn.pixabay.com/photo/2018/01/04/18/58/cats-3061372_960_720.jpg"},
            { id:3, title:"food",img:"https://cdn.pixabay.com/photo/2017/06/06/22/46/mediterranean-cuisine-2378758_960_720.jpg"},
            { id:4, title:"nature", img:"https://cdn.pixabay.com/photo/2018/01/01/16/05/nature-3054445_960_720.jpg"},
            { id:5, title:"photo", img:"https://cdn.pixabay.com/photo/2016/12/23/12/40/night-1927265_960_720.jpg"},
            { id:6, title:"snow", img:"https://cdn.pixabay.com/photo/2016/12/13/11/24/hoarfrost-1903886_960_720.jpg"}
        ],
    }

}