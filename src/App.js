import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './App.css'; // Import the CSS file

function App() {
  const [cameraStream, setCameraStream] = useState(null);
  const [textToCopy, setTextToCopy] = useState("Here is a string to copy!");

  const handleOpenCamera = async () => {
    try {
      // Check if there are any video devices available
      const devices = await navigator.mediaDevices.enumerateDevices();
      const backCamera = devices.find(device => device.kind === 'videoinput' && device.label.toLowerCase().includes('environment'));

      if (!backCamera) {
        console.error('Back camera not found.');
        return; // If no back camera is found, do not proceed
      }

      // Access the back camera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: backCamera.deviceId } } // Use the back camera
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
