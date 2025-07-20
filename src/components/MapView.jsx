import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './styles/MapView.css';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const vehicleIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2718/2718224.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapView = ({ currentPosition, traveledPath }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && currentPosition) {
      mapRef.current.setView([currentPosition.latitude, currentPosition.longitude], 17);
    }
  }, [currentPosition]);

  return (
    <MapContainer 
      center={[17.385044, 78.486671]} 
      zoom={15} 
      ref={mapRef}
      className="map"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {currentPosition && (
        <Marker 
          position={[currentPosition.latitude, currentPosition.longitude]} 
          icon={vehicleIcon}
        >
          <Popup>Vehicle Position</Popup>
        </Marker>
      )}
      {traveledPath.length > 0 && (
        <Polyline 
          positions={traveledPath} 
          color="blue" 
          weight={3}
        />
      )}
    </MapContainer>
  );
};

export default MapView;