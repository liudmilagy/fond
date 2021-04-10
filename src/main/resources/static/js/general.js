export function view_header(title) {
    return {
        view: 'template',
        type: 'header',
        template: title,
        borderless: true,
    }
}

export const main_padding = 20;