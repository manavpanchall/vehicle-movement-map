import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/MapView.css'; 

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const vehicleIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2718/2718224.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const MapView = ({ currentPosition, traveledPath }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && currentPosition) {
      const { latitude, longitude } = currentPosition;
      mapRef.current.setView([latitude, longitude], 17);
      
      if (markerRef.current) {
        markerRef.current.setLatLng([latitude, longitude]);
      }
    }
  }, [currentPosition]);

  return (
    <MapContainer 
      center={[17.385044, 78.486671]} 
      zoom={15} 
      ref={mapRef}
      className="map-view"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {traveledPath.length > 0 && (
        <Polyline 
          positions={traveledPath} 
          color="var(--primary-color)" 
          weight={4}
          opacity={0.8}
        />
      )}
      
      {currentPosition && (
        <Marker 
          position={[currentPosition.latitude, currentPosition.longitude]} 
          icon={vehicleIcon}
          ref={markerRef}
        >
          <Popup className="vehicle-popup">
            <div className="popup-content">
              <h4>Vehicle Position</h4>
              <p>Lat: {currentPosition.latitude.toFixed(6)}</p>
              <p>Lng: {currentPosition.longitude.toFixed(6)}</p>
              {currentPosition.timestamp && (
                <p>Time: {new Date(currentPosition.timestamp).toLocaleTimeString()}</p>
              )}
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapView;