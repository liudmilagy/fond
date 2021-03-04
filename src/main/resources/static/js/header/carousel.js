function img(obj){
    return '<img src="'+obj.src+'" class="content" style="opacity: 0.7" ondragstart="return false"/>'
}

// .content {
//     max-width:100%;
//     max-height:100%;
// }

var some_view = {
    rows: [
        {
            view: 'label',
            label: 'Label',
        },
        {
            view: 'button',
            value: 'Button',
        }
    ]
}

export const carousel = {
    view: "carousel",
    css: "webix_dark",
    // css: {
    //     "content" : {
    //         "max-width": "100%",
    //         "max-height": "100%",
    //     }
    // },
    id: "carouselId",
    // height: document.body.clientHeight * 0.3,
    width: 600,
    height: 400,
    cols: [
        // {
        //     css: "image",
        //     template: img,
        //     data: {src: "../imgs/carousel_bg1.jpg", title: "Image 1"}
        // },
        {
            css: "image",
            template: img,
            data: {src: "../imgs/carousel_bg.webp", title: "Image 2"}
        },
        {
            css: "image",
            template: img,
            data: {src: "../imgs/carousel_bg.webp", title: "Image 2"}
        },
        // some_view,
    ],
    // navigation: {
    //     type: "side"
    // }
}