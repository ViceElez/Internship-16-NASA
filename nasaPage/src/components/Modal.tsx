import React, { useEffect } from "react";
import '../index.css';

interface ModalProps {
  imageUrl: string | null;
  isOpen: boolean;
  closeModal: () => void;
  lat: number | null;
  lng: number | null;
  setFavorites: (favorites: { lat: number, lng: number }[]) => void; // Prop to update favorites
}

export default function Modal({
  imageUrl,
  isOpen,
  closeModal,
  lat,
  lng,
  setFavorites
}: ModalProps) {
  if (!isOpen) return null;

  const addFavorite = () => {
    const favorites = localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites") || "[]")
      : [];
    
    const exisingFavorite = favorites.find(
      (favorite: { lat: number; lng: number }) => favorite.lat === lat && favorite.lng === lng
    );
    if (exisingFavorite) {
      alert("Favorite already added");
      return;
    }
    
    favorites.push({ lat, lng });
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setFavorites(favorites); 
    
    alert("Favorite added");
    closeModal();
  };
  


  return (
    <div className="modal">
      <div className="overlay" onClick={closeModal}></div>
      <div className="modal-content">
        {imageUrl && (
          <div>
            <p className="modal-text">Satellite View</p>
            <img
              src={imageUrl}
              alt="Satellite View"
              style={{ width: "100%", maxWidth: "400px", borderRadius: "10px" }}
            />
          </div>
        )}
        <button className="close-modal" onClick={closeModal}>
          Close
        </button>
        <button className="favorite-modal" onClick={addFavorite}>
          Favorite
        </button>
      </div>
    </div>
  );
}
