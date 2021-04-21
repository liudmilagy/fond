export function map() {
    const ya_map = {
        view: 'form',
        id: 'mapId',
        height: 400,
        rows: [
            {
                view: "yandex-map",
                id: "map",
                load: ["Map", "Placemark"],
                lang:"ru-RU",
                zoom: 18,
                center: [51.839244, 107.576130]
            }
        ],
    }

    return ya_map;
}