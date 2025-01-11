import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "./map.css";
import * as L from 'leaflet';
import { MyPopup } from './myPopup';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: "/marker-icon-2x.png",
    iconUrl: "/marker-icon.png",
    shadowUrl: "/marker-shadow.png",
});

const position: L.LatLngExpression = [52.2297, 21.0122]; // Warszawa

function MyLeafletMap() {
    const [markers, setMarkers] = useState<{ position: L.LatLngExpression; img: string, desc: string }[]>([
        { position: [52.2297, 21.0122], img: "ryba.jpg", desc: "ale brały dzisiaj ryby" },
        { position: [52.24, 21.0122], img: "inne_ryba.jpg", desc: "tylko taka mała płotka ;<" },
    ]);

    const addMarker = (newMarker: { position: L.LatLngExpression; img: string, desc: string }) => {
        //TODO wysłanie zapytania o każde
        setMarkers((prev) => [...prev, newMarker]);
    };

    useEffect(() => {

        setTimeout(() => {
            addMarker({ position: [52.25, 21.03], img: "kolejna_ryba.jpg", desc: "tak se" });
        }, 2000);
    }, []);

    return (
        <div id="map">
            <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers.map((marker, i) => (
                    <Marker position={marker.position} key={`marker-${i}`}>
                        <Popup className='popupOp'>
                            <MyPopup imgStr={marker.img} desc={marker.desc} />
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export { MyLeafletMap };
