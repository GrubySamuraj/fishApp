import React, { useState } from "react";

function FishMap() {
    const [markers, setMarkers] = useState([]);
    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        const newMarker = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        }
        setMarkers((prevMakers) => [...prevMakers, newMarker]);
    }
}