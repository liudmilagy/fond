export function view_header(title) {
    return {
        view: 'template',
        type: 'header',
        css: 'fond_label',
        template: title,
        borderless: true,
    }
}

export const main_padding = 20;

export const main_body_width = 1200;

export function getOtherWidth() {
    if (document.body.clientWidth < main_body_width) {
        return 0;
    } else {
        return (document.body.clientWidth - main_body_width)/2;
    }
}

export const lft_wdth = {
    id: 'leftId',
    width: getOtherWidth(),
}

export const rght_wdth = {
    id: 'rightId',
    width: getOtherWidth(),
}

export function resizeSides() {
    const lft = $$('leftId');
    // lft.$width = getOtherWidth();
    lft.define("width", getOtherWidth());
    lft.resize();

    const rght = $$('rightId');
    // rght.$width = getOtherWidth();
    rght.define("width", getOtherWidth());
    rght.resize();
}

export const numberFormatWithoutDecimal = {
    groupSize:3,        // the number of digits in a group
    groupDelimiter:" ", // a mark that divides numbers with many digits into groups
    decimalDelimiter:",",// the decimal delimiter
    decimalSize:0       // the number of digits after the decimal mark
};

export function getImageClassByExtension(extensionName) {
    let imgClass;
    switch (extensionName) {
        case '.zip':
            imgClass = 'zip_background';
            break;
        case '.7z':
            imgClass = 'zip_background';
            break;
        case '.doc':
            imgClass = 'doc_background';
            break;
        case '.docx':
            imgClass = 'doc_background';
            break;
        case '.xlsx':
            imgClass = 'xls_background';
            break;
        case '.xls':
            imgClass = 'xls_background';
            break;
        case '.pdf':
            imgClass = 'pdf_background';
            break;
    }
    return imgClass;
}

export function changeContentView(newView) {
    webix.ui({
        id: 'content',
        rows: [
            webix.copy(newView)
        ]
    }, $$('content'));
}