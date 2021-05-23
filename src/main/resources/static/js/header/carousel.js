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
    // css: "webix_dark",
    // css: {
    //     "content" : {
    //         "max-width": "100%",
    //         "max-height": "100%",
    //     }
    // },
    id: "carouselId",
    // height: document.body.clientHeight * 0.3,
    autoheight: true,
    autowidth: true,
    cols: [
        {
            height: 350,
            template: '<div class="container">' +
                '<img src="../imgs/baikal.gif" style="width:100%; height:350px; object-fit:cover">' +
                '<div class="heading">' +
                'ПОДДЕРЖКА' +
                '</div>'+
                '<div class="heading2">'+
                'субъектов малого и среднего предпринимательства<br>' +
                'Республики Бурятия\n' +
                '</div>'+
                '</div>'
        },
        {
            height: 350,
            template: '<div class="container">' +
                '<img src="../imgs/carousel_bg.webp" style="width:100%; height:350px; object-fit:cover">' +
                '<div class="heading">' +
                'ПОДДЕРЖКА' +
                '</div>'+
                '<div class="heading2">'+
                'субъектов малого и среднего предпринимательства<br>' +
                'Республики Бурятия\n' +
                '</div>'+
                '</div>'
        },
        {
            height: 350,
            template: '<div class="container">' +
                '<img src="../imgs/baikal.gif" style="width:100%; height:350px; object-fit:cover">' +
                '<div class="heading">' +
                'ПОДДЕРЖКА' +
                '</div>'+
                '<div class="heading2">'+
                'субъектов малого и среднего предпринимательства<br>' +
                'Республики Бурятия\n' +
                '</div>'+
                '</div>'
        },
    ],
}