const phone = {
    height: 50,
    css: {
      'background-color': 'transparent',
    },
    template:"<div style='display: flex; width: 250px; height: 50px; flex-wrap: wrap;' >" +
        "  <div style='flex: 1; display: flex; flex-direction: column'>" +
        "    <div style='flex: 2; display: flex; justify-content: center; align-items: center;'>" +
        "       <span class ='left product_icon webix_icon fas fa-phone-alt' style='color: #6c5b7b; font-size: x-large'></span>" +
        "    </div>" +
        "  </div>" +
        "  <div style='flex: 3; display: flex; flex-direction: column'>" +
        "    <div style='flex: 1; font-weight: bolder; font-size: large; font-family:Montserrat, serif;'>" +
        "      Телефон:" +
        "    </div>" +
        "    <div style='flex: 1; font-size: large; font-family:Montserrat, serif;'>" +
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
        "       <span class ='left product_icon webix_icon fas fa-envelope' style='color: #6c5b7b; font-size: x-large'></span>" +
        "    </div>" +
        "  </div>" +
        "  <div style='flex: 3; display: flex; flex-direction: column'>" +
        "    <div style='flex: 1; font-weight: bolder; font-size: large; font-family:Montserrat, serif;'>" +
        "      E-mail:" +
        "    </div>" +
        "    <div style='flex: 1; font-size: large; font-family:Montserrat, serif;'>" +
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
        "       <span class ='left product_icon webix_icon fas fa-map-marker-alt' style='color: #6c5b7b; font-size: x-large'></span>" +
        "    </div>" +
        "  </div>" +
        "  <div style='flex: 3; display: flex; flex-direction: column'>" +
        "    <div style='flex: 1; font-weight: bolder; font-size: large; font-family:Montserrat, serif;'>" +
        "      Адрес:" +
        "    </div>" +
        "    <div style='flex: 1; font-size: large; font-family:Montserrat, serif;'>" +
        "      ул. Партизанская 28" +
        "    </div>" +
        "  </div>" +
        "</div>",
    borderless: true,
}

const appointment_button = {
    view: 'button',
    autowidth: true,
    css: 'contact_button',
    value: 'Записаться',
    click: () =>  window.location.href = "/appointment"
}

export const footer_contacts = {
    css: 'contact_form',
    padding: 20,
    // rows: [
    //     {
            cols: [
                phone,
                mail,
                address,
                appointment_button,
                { gravity: 0.1},
            ]
    //     },
    // ]
}