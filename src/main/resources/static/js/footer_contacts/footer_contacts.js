const phone = {
    height: 50,
    css: {
      'background-color': 'transparent',
    },
    template:"<div style='display: flex; width: 250px; height: 50px; flex-wrap: wrap;' >" +
        "  <div style='flex: 1; display: flex; flex-direction: column'>" +
        "    <div style='flex: 2; display: flex; justify-content: center; align-items: center;'>" +
        "       <span class ='left product_icon webix_icon fas fa-phone-alt' style='color: #623B2A; font-size: x-large'></span>" +
        "    </div>" +
        "  </div>" +
        "  <div style='flex: 3; display: flex; flex-direction: column'>" +
        "    <div style='flex: 1; font-weight: bolder; font-size: large;'>" +
        "      Телефон:" +
        "    </div>" +
        "    <div style='flex: 1; font-size: large; '>" +
        "      8 (3012) 48-08-08" +
        "    </div>" +
        "  </div>" +
        "</div>",
    borderless: true,
}

const mail = {
    height: 50,
    css: {
        'background-color': 'transparent',
    },
    template:"<div style='display: flex; width: 250px; height: 50px; flex-wrap: wrap;' >" +
        "  <div style='flex: 1; display: flex; flex-direction: column'>" +
        "    <div style='flex: 2; display: flex; justify-content: center; align-items: center;'>" +
        "       <span class ='left product_icon webix_icon fas fa-envelope' style='color: #623B2A; font-size: x-large'></span>" +
        "    </div>" +
        "  </div>" +
        "  <div style='flex: 3; display: flex; flex-direction: column'>" +
        "    <div style='flex: 1; font-weight: bolder; font-size: large; '>" +
        "      E-mail:" +
        "    </div>" +
        "    <div style='flex: 1; font-size: large;'>" +
        "      fond03@mail.ru" +
        "    </div>" +
        "  </div>" +
        "</div>",
    borderless: true,
}

const address = {
    height: 50,
    css: {
        'background-color': 'transparent',
    },
    template:"<div style='display: flex; width: 250px; height: 50px; flex-wrap: wrap;' >" +
        "  <div style='flex: 1; display: flex; flex-direction: column'>" +
        "    <div style='flex: 2; display: flex; justify-content: center; align-items: center;'>" +
        "       <span class ='left product_icon webix_icon fas fa-map-marker-alt' style='color: #623B2A; font-size: x-large'></span>" +
        "    </div>" +
        "  </div>" +
        "  <div style='flex: 3; display: flex; flex-direction: column'>" +
        "    <div style='flex: 1; font-weight: bolder; font-size: large;'>" +
        "      Адрес:" +
        "    </div>" +
        "    <div style='flex: 1; font-size: large;'>" +
        "      ул. Партизанская 28" +
        "    </div>" +
        "  </div>" +
        "</div>",
    borderless: true,
}

function appointment_button(isBigForm) {
    return {
        view: 'button',
        autowidth: true,
        css: 'contact_button',
        align: (isBigForm) ? 'left' : 'center',
        value: 'Записаться',
        click: () => window.location.href = "/appointment"
    }
}

export function footer_contacts(isBigForm) {
    if (isBigForm) {
        return {
            css: 'contact_form',
            padding: 20,
            cols: [
                phone,
                mail,
                address,
                appointment_button(isBigForm),
                {gravity: 0.1},
            ]
        }
    } else {
        return {
            css: 'contact_form',
            margin: 20,
            rows: [
                phone,
                mail,
                address,
                appointment_button(isBigForm),
                {gravity: 0.1},
            ]
        }
    }
}
