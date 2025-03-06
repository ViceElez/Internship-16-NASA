import { useLocation } from "react-router-dom";
import "../index.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer,useMapEvents,Marker  } from "react-leaflet";
import { Icon, LatLngExpression } from "leaflet";
import 'leaflet/dist/leaflet.css';
import {getEarthImagery} from "../services/index";
import markerIcon from "../assets/images/marker.png";


const ClickableMap = ({ onLocationSelect }: { onLocationSelect: (location: { lat: number, lng: number }) => void }) => {
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            onLocationSelect({ lat, lng });
        },
    });
    return null;
};

export const EarthImageryPage = () => {
    const currentLocation = useLocation();
    const [selectedCoords, setSelectedCoords] = useState<{ lat: number, lng: number } | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);


    const markers=[
        {
            lat:51.505,
            lng:-0.09
        },
        {
            lat:51.505,
            lng:-0.08
        },
        {
            lat:51.505,
            lng:-0.07
        },
        {
            lat:51.505,
            lng:-0.06
        }
    ]

    const customIcon=new Icon({
        iconUrl:markerIcon,
        iconSize:[38,38]
    })

    useEffect(() => {
        const pageLocationsWithScroll = [
            "/apod",
            "/mars-rover",
            "/neo",
            "/earth-imagery",
        ];

        if (pageLocationsWithScroll.includes(currentLocation.pathname)) {
            document.body.style.overflow = "auto";
        } else {
            document.body.style.overflow = "hidden";
        }
    }, [currentLocation]);
    
    const fetchedImageUrl=getEarthImagery(selectedCoords?.lat || 0, selectedCoords?.lng || 0);
    console.log(fetchedImageUrl);
    

    const center: LatLngExpression = [51.505, -0.09];

    return (
        <div className="earth-page-content">
             {selectedCoords && (
                <p className="coordinates">Selected Coordinates: {selectedCoords.lat.toFixed(5)}, {selectedCoords.lng.toFixed(5)}</p>
            )}
            <MapContainer
                center={center}
                zoom={13}
            >
                <TileLayer  
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <ClickableMap onLocationSelect={setSelectedCoords} />
                {markers.map(marker=>(
                    <Marker position={[marker.lat,marker.lng]} 
                    icon={customIcon}/>
                ))}
            </MapContainer>
              {imageUrl && (
                <div style={{ marginTop: "20px" }}>
                    <h2>Satellite Image</h2>
                    <img src={imageUrl} alt="Satellite View" style={{ width: "100%", maxWidth: "600px", borderRadius: "10px" }} />
                </div>
            )}
            <div className="circle-container">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-3"></div>
                <div className="circle circle-4"></div>
            </div>
        </div>
    );
};
