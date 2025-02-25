import React, {useState} from 'react';
import VideoPlayer from './compornents/videoPlayer';
import './App.css';

function App() {
  const [clickInfo, setClickInfo] = useState({x: null, y: null, time: null});
  const [clickData, setClickData] = useState([]);


  // データを取得。デジタイズ部分
  const handleVideoClick = (e) => {
    const video = videoRef.current; // コンポーネント内でしかvideoRefを定義してない。変えないと使い勝手悪そう。
    if(!video) return;
    const rect = video.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const scaleX = video.videoWidth / rect.width;
    const scaleY = video.videoHeight / rect.height;
    const actualX = Math.round(x * scaleX);
    const actualY = Math.round(video.videoHeight - (y * scaleY));
    setClickInfo({x: actualX, y: actualY, time: video.currentTime});
  };




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

    // 行（データ）の削除
    const handleDeleteRow = (id) => {
      setClickData((prev) => prev.filter((item) => item.id !== id))
    };

  const handleNoteChange = (e) => {
    setClickData((prev) => 
     prev.map((item) => (item.id === Id ? { ...item, note: newNote } : item))
   );
  };




  // CSVの出力
  const handleExportCSV = () => {
    if(clickData.length === 0) {
      alert("出力するデータがありません。")
      return;
    }

    const header = ["No.", "X座標", "Y座標","時間(sec)","補足",""] // headerとしてCSVの一番上の行を手書き
    const csvContent = [header]; // ここでheaderをリストに入れといて、この下で他の物を追加するコードを記述
    clickData.forEach((item) => {
      csvContent.push([
        item.id,
        item.x,
        item.y,
        item.time.toFixed(3),
        item.note || "" // noteがなければ空文字
      ]);
    });
    const csv = csvContent
    .map((row) => 
      row
        .map((cell) => {
          const value = String(cell);
          return value.includes(",") || value.includes('"') // これらの文字をどっちか含んでたらreplaceする処理に行く
          ? `"${value.replace(/"/g,'""')}"` // CSVのエスケープへの対応
          : value; // 上のやつ含まなければvalueをそのまま返す
        })
        .join(",")
    )
    .join("\n"); // 行を変えるための改行。これと,のjoinのために2回のmap.
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]); // 文字化け防止。「UTF-8だよー」
    const blob = new Blob([bom,csv], {type: "text/csv;charset=utf-8"});
    const date = new Date();
    const timestamp =
      date.getFullYear() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2) +
      "_" +
      ("0" + date.getHours()).slice(-2) +
      ("0" + date.getMinutes()).slice(-2) +
      ("0" + date.getSeconds()).slice(-2);
    const fileName = `click_data_${timestamp}.csv`;
    const link  = document.createElement("a"); // 謎　調べる
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => {
      URL.revokeObjectURL(link.href);
    },100);
  };






  
  





  return (
    <div className="App">
      <VideoPlayer onClick={handleVideoClick}/>
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
                <th>時間(sec)</th>
                <th>補足</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {clickData.map((item) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div> // Appのとじタグ
  );
}

export default App;
