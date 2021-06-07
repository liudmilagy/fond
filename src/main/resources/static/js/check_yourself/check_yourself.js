const bigCheckYourself = {
    // view: 'form',
    css: 'check_yourself_form',
    minHeight: 100,
    padding: 20,
    cols: [
        {
            view: 'template',
            css: 'check_yourself',
            template: 'Проверь себя в Едином реестре субъектов малого и среднего предпринимательства (СМСП)',
            autoheight: true,
            borderless: true,
        },
        {
            rows: [
                {},
                {
                    view: 'button',
                    align: 'right',
                    value: 'Перейти на сайт',
                    width: 250,
                    css: 'check_yourself',
                    click: () => {
                        window.open('https://rmsp.nalog.ru/');
                    }
                }
            ]
        }
    ]
}

const smallCheckYourself = {
    // view: 'form',
    css: 'check_yourself_form',
    minHeight: 100,
    padding: 20,
    rows: [
        {
            view: 'template',
            css: 'check_yourself',
            template: 'Проверь себя в Едином реестре субъектов малого и среднего предпринимательства (СМСП)',
            autoheight: true,
            borderless: true,
        },
        {
            view: 'button',
            align: 'right',
            value: 'Перейти на сайт',
            width: 250,
            css: 'check_yourself',
            click: () => {
                window.open('https://rmsp.nalog.ru/');
            }
        }
    ]
}

export function checkYourself(isBigForm) {
    if (isBigForm) {
        return bigCheckYourself;
    }
    else {
        return smallCheckYourself;
    }
}