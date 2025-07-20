import React, { useState } from 'react';
import MapView from './components/MapView';
import Controls from './components/Controls';
import VehicleInfo from './components/VehicleInfo';
import './styles/App.css';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [traveledPath, setTraveledPath] = useState([]);
  const [speed, setSpeed] = useState(0);

  return (
    <div className="app-container">
      <h1 className="app-title">Vehicle Movement Simulator</h1>
      <div className="main-content">
        <div className="map-container">
          <MapView 
            currentPosition={currentPosition} 
            traveledPath={traveledPath} 
          />
        </div>
        <div className="sidebar">
          <VehicleInfo 
            currentPosition={currentPosition} 
            speed={speed} 
          />
          <Controls 
            isPlaying={isPlaying} 
            setIsPlaying={setIsPlaying} 
            setCurrentPosition={setCurrentPosition} 
            setTraveledPath={setTraveledPath}
            setSpeed={setSpeed}
          />
        </div>
      </div>
    </div>
  );
}

export default App;