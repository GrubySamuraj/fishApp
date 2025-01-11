import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

export interface MarkerInterface {
    lat: number;
    lng: number;
}

export const AddFishMap = ({
    marker,
    setMarkers,
}: {
    marker: MarkerInterface | undefined;
    setMarkers: React.Dispatch<React.SetStateAction<MarkerInterface | undefined>>;
}) => {
    const MapClickHandler = () => {
        useMapEvents({
            click: (event) => {
                const { lat, lng } = event.latlng;
                setMarkers({ lng, lat });
            },
        });
        return null;
    };

    return (
        <MapContainer
            center={[52.2297, 21.0122]}
            zoom={13}
            style={{ height: "500px", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapClickHandler />
            {marker ? <Marker position={[marker.lat, marker.lng]} /> : null}
        </MapContainer>
    );
};
