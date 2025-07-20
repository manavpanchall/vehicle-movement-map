import React, { useState, useEffect } from 'react'; 
import { FaPlay, FaPause, FaRedo, FaTachometerAlt } from 'react-icons/fa';
import '../styles/Controls.css'; 

const Controls = ({ 
  isPlaying, 
  setIsPlaying, 
  setCurrentPosition, 
  setTraveledPath, 
  setSpeed,
  progress,     
  setProgress 
}) => {
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [routeData, setRouteData] = useState([]);

  useEffect(() => {
    fetch('/dummy-route.json')
      .then(response => response.json())
      .then(data => setRouteData(data));
  }, []);

  useEffect(() => {
    let interval;
    if (isPlaying && routeData.length > 0) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1;
          if (newProgress >= routeData.length) {
            clearInterval(interval);
            setIsPlaying(false);
            return prev;
          }
          
          const currentPoint = routeData[newProgress];
          setCurrentPosition(currentPoint);
          
          setTraveledPath(prevPath => [
            ...prevPath,
            [currentPoint.latitude, currentPoint.longitude]
          ]);
          
          if (newProgress > 0 && routeData[newProgress].timestamp && routeData[newProgress - 1].timestamp) {
            const timeDiff = (new Date(routeData[newProgress].timestamp) - new Date(routeData[newProgress - 1].timestamp)) / 1000;
            if (timeDiff > 0) {
              const latDiff = routeData[newProgress].latitude - routeData[newProgress - 1].latitude;
              const lngDiff = routeData[newProgress].longitude - routeData[newProgress - 1].longitude;
              const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 111;
              const speedKph = (distance / timeDiff) * 3600;
              setSpeed(Math.round(speedKph * 10) / 10);
            }
          }
          
          return newProgress;
        });
      }, 1000 / speedMultiplier);
    }
    return () => clearInterval(interval);
  }, [isPlaying, routeData, speedMultiplier, setCurrentPosition, setTraveledPath, setIsPlaying, setSpeed, setProgress]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentPosition(null);
    setTraveledPath([]);
    setSpeed(0);
  };

  return (
    <div className="controls-card">
      <div className="controls-header">
        <h3>Simulation Controls</h3>
        <div className="speed-indicator">
          <FaTachometerAlt />
          <span>{speedMultiplier}x</span>
        </div>
      </div>
      
      <div className="controls-buttons">
        <button 
          onClick={handlePlayPause} 
          className={`control-btn ${isPlaying ? 'pause-btn' : 'play-btn'}`}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        
        <button 
          onClick={handleReset} 
          className="control-btn reset-btn"
        >
          <FaRedo /> Reset
        </button>
      </div>
      
      <div className="speed-control">
        <label>Simulation Speed:</label>
        <input 
          type="range" 
          min="0.5" 
          max="5" 
          step="0.5"
          value={speedMultiplier} 
          onChange={(e) => setSpeedMultiplier(Number(e.target.value))}
          disabled={isPlaying}
        />
        <div className="speed-labels">
          <span>0.5x</span>
          <span>1x</span>
          <span>2x</span>
          <span>3x</span>
          <span>4x</span>
          <span>5x</span>
        </div>
      </div>
      
      <div className="progress-tracker">
        <label>Journey Progress</label>
        <div className="progress-bar-container">
          <div 
            className="progress-bar" 
            style={{
              width: `${routeData.length > 0 ? (progress / (routeData.length - 1)) * 100 : 0}%`
            }}
          ></div>
        </div>
        <div className="progress-text">
          {progress} / {routeData.length > 0 ? routeData.length - 1 : '--'} waypoints
        </div>
      </div>
    </div>
  );
};

export default Controls;