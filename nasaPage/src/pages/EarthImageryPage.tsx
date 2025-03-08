import { useLocation } from "react-router-dom";
import "../index.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";
import { Icon, LatLngExpression, DivIcon, point } from "leaflet";
import "leaflet/dist/leaflet.css";
import { getEarthImagery } from "../services/index";
import markerIcon from "../assets/images/marker.png";
import MarkerClusterGroup from "react-leaflet-cluster";
import Modal from "../components/Modal";

const ClickableMap = ({
  onLocationSelect,
  disabled,
}: {
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  disabled: boolean;
}) => {
  useMapEvents({
    click(e) {
      if (!disabled) {
        const { lat, lng } = e.latlng;
        onLocationSelect({ lat, lng });
      }
    },
  });
  return null;
};

export const EarthImageryPage = () => {
  const currentLocation = useLocation();
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<{ lat: number; lng: number }[]>([]);
  const [loading, setLoading] = useState(false); // LOADING STATE

  const customIcon = new Icon({
    iconUrl: markerIcon,
    iconSize: [38, 38],
  });

  const createCustomClusterIcon = function (cluster: any) {
    return new DivIcon({
      html: `<div class="custom-cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-cluster-icon",
      iconSize: point(33, 33, true),
    });
  };

  useEffect(() => {
    const pageLocationsWithScroll = ["/apod", "/mars-rover", "/neo"];

    if (pageLocationsWithScroll.includes(currentLocation.pathname)) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [currentLocation]);

  useEffect(() => {
    if (selectedCoords) {
      const fetchImage = async () => {
        setLoading(true); // START LOADING
        try {
          const fetchedImageUrl = await getEarthImagery(selectedCoords.lat, selectedCoords.lng);
          if (fetchedImageUrl) {
            setImageUrl(fetchedImageUrl);
            setIsModalOpen(true);
          } else {
            setImageUrl(null);
            alert("No image found for the selected coordinates");
          }
        } catch (error) {
          console.error("Error fetching satellite image:", error);
        } finally {
          setLoading(false); // STOP LOADING
        }
      };

      fetchImage();
    }
  }, [selectedCoords]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites") || "[]")
      : [];
    setFavorites(storedFavorites);
  }, []);

  const center: LatLngExpression = [51.505, -0.09];

  return (
    <div className="earth-page-content">
      {selectedCoords && (
        <p className="coordinates">
          Selected Coordinates: {selectedCoords.lat.toFixed(5)}, {selectedCoords.lng.toFixed(5)}
        </p>
      )}

      {loading && <div className="loader">🚀 Fetching your satellite data... Sit tight! ⏳</div>}

      <MapContainer center={center} zoom={13}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <ClickableMap onLocationSelect={setSelectedCoords} disabled={loading} />
        <MarkerClusterGroup key={selectedCoords?.lat} chunkedLoading iconCreateFunction={createCustomClusterIcon}>
          {favorites.map((marker: { lat: number; lng: number }) => (
            <Marker key={`${marker.lat}-${marker.lng}`} position={[marker.lat, marker.lng]} icon={customIcon} />
          ))}
        </MarkerClusterGroup>
      </MapContainer>

      <Modal
        imageUrl={imageUrl}
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        lat={selectedCoords?.lat ?? null}
        lng={selectedCoords?.lng ?? null}
        setFavorites={setFavorites}
      />

      <div className="circle-container">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
        <div className="circle circle-4"></div>
      </div>
    </div>
  );
};
