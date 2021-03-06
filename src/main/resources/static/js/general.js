export function view_header(title) {
    return {
        view: 'template',
        // type: 'header',
        css: 'other_tab_main_title',
        template: title,
        align: 'center',
        autoheight: true,
        borderless: true,
    }
}

export function view_header_left(title) {
    return {
        view: 'template',
        // type: 'header',
        css: 'product_label_main_title_left',
        template: title,
        autoheight: true,
        borderless: true,
    }
}

export const main_padding = 20;

export const main_body_width = 1300;

export const collapsedSideBarWidth = 41;

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

export const padding_for_big_form = {
    top: 20,
    bottom: 20,
    left: getOtherWidth(),
    right: getOtherWidth(),

}

export function resizePadding(id) {
    let view = $$(id);
    view.define("padding", webix.extend({left: getOtherWidth(), right: getOtherWidth()}, view.config.padding));
    view.reconstruct();
}

export function resizeSides() {
    const lftMain = $$('leftMainTemplateId');
    if (lftMain) {
        lftMain.define("width", getOtherWidth());
        lftMain.resize();
    }

    const rghtMain = $$('rightMainTemplateId');
    if (rghtMain) {
        rghtMain.define("width", getOtherWidth());
        rghtMain.resize();
    }

    const lft = $$('leftId');
    if (lft) {
        lft.define("width", getOtherWidth());
        lft.resize();
    }

    const rght = $$('rightId');
    if (rght) {
        rght.define("width", getOtherWidth());
        rght.resize();
    }

    const lftFooter = $$('leftFooterId');
    if (lftFooter) {
        lftFooter.define("width", getOtherWidth());
        lftFooter.resize();
    }

    const rghtFooter = $$('rightMainTemplateId');
    if (rghtFooter) {
        rghtFooter.define("width", getOtherWidth());
        rghtFooter.resize();
    }

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

export function getFileIcon(fileExtension) {
    let docImg;
    switch (fileExtension) {
        case '.zip':
            docImg = 'zip.png';
            break;
        case '.pdf':
            docImg = 'pdf.png';
            break;
        case '.xls':
            docImg = 'xls.png';
            break;
        case '.xlsx':
            docImg = 'xls.png';
            break;
        case '.doc':
            docImg = 'doc.png';
            break;
        case '.docx':
            docImg = 'doc.png';
            break;
        default:
            docImg = 'file.png';
            break;
    }
    return docImg;
}

export function changeContentView(newView) {
    webix.ui({
        id: 'content',
        rows: [
            webix.copy(newView)
        ]
    }, $$('content'));
}
