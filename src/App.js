import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './App.css'; // Import the CSS file

function App() {
  const [cameraStream, setCameraStream] = useState(null);
  const [textToCopy, setTextToCopy] = useState("Here is a string to copy!");

  const handleOpenCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { exact: "environment" } } // Use the back camera
      });
      setCameraStream(stream);
      // Show video stream (optional)
      const videoElement = document.getElementById("videoElement");
      videoElement.srcObject = stream;
    } catch (err) {
      console.error("Error accessing the camera: ", err);
    }
  };

  return (
    <div className="container">
      <h1>Phone Camera and Copy Text App</h1>

      {/* Button to access camera */}
      <button className="button" onClick={handleOpenCamera}>
        Access Camera
      </button>

      {/* Video feed (optional, if you want to display the camera feed) */}
      <video id="videoElement" className="video" autoPlay />

      {/* Text tab with a copy feature */}
      <div className="copy-container">
        <p>{textToCopy}</p>
        <CopyToClipboard text={textToCopy}>
          <button className="copy-button">Copy Text</button>
        </CopyToClipboard>
      </div>
    </div>
  );
}

export default App;
