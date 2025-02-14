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
export interface fishMarker {
    position: L.LatLngExpression;
    img: string;
    desc: string;
}
function MyLeafletMap({ markers }: { markers: fishMarker[]; }) {
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
