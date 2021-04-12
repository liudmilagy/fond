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