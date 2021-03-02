export const carousel = {
    view: "carousel",
    css: "`webix_dark`",
    id: "carousel1",
    width:500, height:400,
    cols: [
        {
            css: "image",
            template: img,
            data: {src: "http://docs.webix.com/samples/26_carousel/imgs/image001.jpg", title: "Image 1"}
        },
        {
            css: "image",
            template: img,
            data: {src: "http://docs.webix.com/samples/26_carousel/imgs/image002.jpg", title: "Image 2"}
        },
        {
            css: "image",
            template: img,
            data: {src: "http://docs.webix.com/samples/26_carousel/imgs/image003.jpg", title: "Image 3"}
        },
        {
            css: "image",
            template: img,
            data: {src: "http://docs.webix.com/samples/26_carousel/imgs/image004.jpg", title: "Image 4"}
        },
        {
            css: "image",
            template: img,
            data: {src: "http://docs.webix.com/samples/26_carousel/imgs/image005.jpg", title: "Image 5"}
        },
        {
            css: "image",
            template: img,
            data: {src: "http://docs.webix.com/samples/26_carousel/imgs/image006.jpg", title: "Image 6"}
        }
    ],
    // navigation: {
    //     type: "side"
    // }
}