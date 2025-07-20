import React from 'react';
import './styles/VehicleInfo.css';

const VehicleInfo = ({ currentPosition, speed }) => {
  return (
    <div className="vehicle-info-container">
      <h3>Vehicle Information</h3>
      {currentPosition ? (
        <>
          <div className="info-row">
            <span className="info-label">Latitude:</span>
            <span className="info-value">{currentPosition.latitude.toFixed(6)}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Longitude:</span>
            <span className="info-value">{currentPosition.longitude.toFixed(6)}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Speed:</span>
            <span className="info-value">{speed} km/h</span>
          </div>
          {currentPosition.timestamp && (
            <div className="info-row">
              <span className="info-label">Timestamp:</span>
              <span className="info-value">
                {new Date(currentPosition.timestamp).toLocaleString()}
              </span>
            </div>
          )}
        </>
      ) : (
        <div className="no-data">No vehicle data available. Start the simulation.</div>
      )}
    </div>
  );
};

export default VehicleInfo;