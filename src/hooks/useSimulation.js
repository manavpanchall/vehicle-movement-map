import { useState, useEffect } from 'react';

const useSimulation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [traveledPath, setTraveledPath] = useState([]);
  const [speed, setSpeed] = useState(0);
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
  }, [isPlaying, routeData, speedMultiplier]);

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

  return {
    isPlaying,
    currentPosition,
    traveledPath,
    speed,
    progress,
    speedMultiplier,
    routeData,
    handlePlayPause,
    handleReset,
    setSpeedMultiplier
  };
};

export default useSimulation;