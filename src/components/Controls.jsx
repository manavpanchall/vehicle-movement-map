import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaRedo } from 'react-icons/fa';
import './styles/Controls.css';

const Controls = ({ isPlaying, setIsPlaying, setCurrentPosition, setTraveledPath, setSpeed }) => {
  const [progress, setProgress] = useState(0);
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
          
          // Calculate speed if we have timestamps
          if (newProgress > 0 && routeData[newProgress].timestamp && routeData[newProgress - 1].timestamp) {
            const timeDiff = (new Date(routeData[newProgress].timestamp) - new Date(routeData[newProgress - 1].timestamp)) / 1000;
            if (timeDiff > 0) {
              // Very simple distance calculation for demo purposes
              const latDiff = routeData[newProgress].latitude - routeData[newProgress - 1].latitude;
              const lngDiff = routeData[newProgress].longitude - routeData[newProgress - 1].longitude;
              const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 111; // approx km
              const speedKph = (distance / timeDiff) * 3600;
              setSpeed(Math.round(speedKph * 10) / 10);
            }
          }
          
          return newProgress;
        });
      }, 1000 / speedMultiplier);
    }
    return () => clearInterval(interval);
  }, [isPlaying, routeData, speedMultiplier, setCurrentPosition, setTraveledPath, setIsPlaying, setSpeed]);

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
    <div className="controls-container">
      <h3>Simulation Controls</h3>
      <div className="buttons-container">
        <button onClick={handlePlayPause} className="control-button">
          {isPlaying ? <FaPause /> : <FaPlay />}
          {isPlaying ? ' Pause' : ' Play'}
        </button>
        <button onClick={handleReset} className="control-button">
          <FaRedo /> Reset
        </button>
      </div>
      <div className="speed-control">
        <label>Speed:</label>
        <select 
          value={speedMultiplier} 
          onChange={(e) => setSpeedMultiplier(Number(e.target.value))}
          disabled={isPlaying}
        >
          <option value={0.5}>0.5x</option>
          <option value={1}>1x</option>
          <option value={2}>2x</option>
          <option value={5}>5x</option>
        </select>
      </div>
      <div className="progress-container">
        <label>Progress:</label>
        <progress 
          value={progress} 
          max={routeData.length > 0 ? routeData.length - 1 : 100}
        />
        <span>{progress} / {routeData.length > 0 ? routeData.length - 1 : '--'}</span>
      </div>
    </div>
  );
};

export default Controls;