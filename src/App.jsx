import React from 'react';
import VideoPlayer from './compornents/videoPlayer';
import './App.css';

function App() {
  // const [clickInfo, setClickInfo] = useState({x: null, y: null, time: null});
  // const [clickData, setClickData] = useState([]);

  const handleAddData = () => {
    if(clickInfo.x === null) return;
    const newEntry = {
      id: clickData.length + 1,
      x: clickInfo.x,
      y: clickInfo.y,
      time: clickInfo.time,
      note: ""
    };
    setClickData((prev) => [...prev, newEntry]);

  };



  
  





  return (
    <div className="App">
      <VideoPlayer />
      <div className="info-container">
        <div className="click-info">
          <h3>click info</h3>
          <p>
            X座標: <span id="xCoord">x value</span>
          </p>
          <p>
            Y座標: <span id="yCoord">y value</span>
          </p>
          <p>
            Time: {''}
            <span id="timeStamp">
              time timeStamp
            </span>
          </p>
          <button id="addData" className="add-button" onClick={handleAddData}>
            データを追加
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
