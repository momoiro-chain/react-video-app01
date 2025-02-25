import React from 'react';
import VideoPlayer from './compornents/videoPlayer';
import './App.css';

function App() {
  // const [clickInfo, setClickInfo] = useState({x: null, y: null, time: null});
  // const [clickData, setClickData] = useState([]);

  // tebleに追加系
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

  const handleNoteChange = (e) => {
    setClickData((prev) => 
     prev.map((item) => (item.id === Id ? { ...item, note: newNote } : item))
   );
  };

  // CSVの出力
  const handleExportCSV = () => {

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
        <div className="data-table-container">
          <div className="table-header">
            <h3>Recorded Data</h3>
            <button id="exportCSV" className="export-button" onClick={handleExportCSV}>
              export CSV
            </button>
          </div>
          <table id="dataTable">
            <thead>
              <tr>
                <th>No.</th>
                <th>X座標</th>
                <th>座標</th>
                <th>時間</th>
                <th>補足</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {/* {clickData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.x}</td>
                  <td>{item.y}</td>
                  <td>{item.time.toFixed(3)}</td>
                  <td>
                    <input
                      type="text"
                      className="note-input default-invisible"
                      placeholder="補足を入力"
                      value={item.note}
                      onChange={(e) => handleNoteChange(item.id, e.target.value)}
                    />
                  </td>
                  <td>
                    <button
                      className="delete--button default-invisible"
                      onClick={() => handleDeleteRow(item.id)}
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </div> // Appのとじタグ
  );
}

export default App;
