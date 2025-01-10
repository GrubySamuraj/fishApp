import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "./map.css";

const position: L.LatLngExpression = [52.2297, 21.0122]; // Warszawa
import * as L from 'leaflet';
import { MyPopup } from './myPopup';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: "/marker-icon-2x.png",
    iconUrl: "/marker-icon.png",
    shadowUrl: "/marker-shadow.png",
});

function MyLeafletMap() {
    const [positions, setPositions] = useState<L.LatLngExpression[]>([[52.2297, 21.0122]]);
    const [imgs, setImgs] = useState<string[]>([""]);
    useEffect(() => {

    }, [])
    return (
        <div id="map">
            <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[52.2297, 21.0122]}>
                    {positions.map((pop, i) => {
                        return (
                            <Popup>
                                <MyPopup img={imgs[i]} key={"img" + imgs[i]} />
                            </Popup>
                        )
                    })}
                </Marker>
            </MapContainer>
        </div>
    );
}

export { MyLeafletMap };
