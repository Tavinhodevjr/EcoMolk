let map;
    async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById("map"), {
        center: { lat: --23.469873428344727, lng: -47.4297981262207 },
        zoom: 8,
    });
}
initMap();