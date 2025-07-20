import React from 'react';
import { FaMapMarkerAlt, FaClock, FaTachometerAlt } from 'react-icons/fa';
import '../styles/VehicleInfo.css'; 

const VehicleInfo = ({ currentPosition, speed, progress }) => {
  return (
    <div className="vehicle-info-card">
      <div className="vehicle-info-header">
        <h3>Vehicle Information</h3>
        <div className="status-indicator">
          <div className={`status-dot ${currentPosition ? 'active' : 'inactive'}`}></div>
          <span>{currentPosition ? 'Active' : 'Inactive'}</span>
        </div>
      </div>
      
      {currentPosition ? (
        <>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="info-content">
                <label>Latitude</label>
                <p>{currentPosition.latitude.toFixed(6)}</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="info-content">
                <label>Longitude</label>
                <p>{currentPosition.longitude.toFixed(6)}</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">
                <FaTachometerAlt />
              </div>
              <div className="info-content">
                <label>Speed</label>
                <p>{speed} km/h</p>
              </div>
            </div>
            
            {currentPosition.timestamp && (
              <div className="info-item">
                <div className="info-icon">
                  <FaClock />
                </div>
                <div className="info-content">
                  <label>Last Update</label>
                  <p>{new Date(currentPosition.timestamp).toLocaleTimeString()}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="progress-section">
            <div className="progress-metric">
              <span>Waypoints Passed</span>
              <span className="progress-value">{progress}</span>
            </div>
          </div>
        </>
      ) : (
        <div className="no-data-message">
          <p>No vehicle data available</p>
          <small>Start the simulation to track vehicle movement</small>
        </div>
      )}
    </div>
  );
};

export default VehicleInfo;