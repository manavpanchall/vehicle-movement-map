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
  const [progress, setProgress] = useState(0);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">🚗 Vehicle Movement Simulator</h1>
        <p className="app-subtitle">Real-time vehicle tracking simulation</p>
      </header>
      
      <div className="main-content">
        <div className="map-section">
          <MapView 
            currentPosition={currentPosition} 
            traveledPath={traveledPath} 
          />
        </div>
        
        <div className="control-panel">
          <VehicleInfo 
            currentPosition={currentPosition} 
            speed={speed} 
            progress={progress}
          />
          
          <Controls 
            isPlaying={isPlaying} 
            setIsPlaying={setIsPlaying} 
            setCurrentPosition={setCurrentPosition} 
            setTraveledPath={setTraveledPath}
            setSpeed={setSpeed}
            setProgress={setProgress}
          />
        </div>
      </div>
      
      <footer className="app-footer">
        <p>Vehicle Movement Simulator © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;