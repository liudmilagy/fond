import {collapsedSideBarWidth} from "../general.js";

export function map() {
    const ya_map = {
        view: 'form',
        id: 'mapId',
        height: 400,
        width: document.body.clientWidth - collapsedSideBarWidth,
        borderless: true,
        rows: [
            {
                view: "yandex-map",
                id: "map",
                load: ["Map", "Placemark"],
                lang:"ru-RU",
                zoom: 17,
                center: [51.839244, 107.576130]
            }
        ],
    }

    return ya_map;
}