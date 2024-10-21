import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './App.css'; // Import the CSS file

function App() {
  const [cameraStream, setCameraStream] = useState(null);
  const [textToCopy, setTextToCopy] = useState("هنا الارقام العربية");
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleOpenCamera = async () => {
    try {
      // Check if there are any video devices available
      const devices = await navigator.mediaDevices.enumerateDevices();
      console.log("Available devices: ", devices); // Debugging line
      const backCamera = devices.find(device => 
        device.kind === 'videoinput' && device.label.toLowerCase().includes('environment')
      );

      if (!backCamera) {
        console.error('Back camera not found.');
        return;
      }

      // Access the back camera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: backCamera.deviceId } }
      });
      setCameraStream(stream);
      setIsCameraOpen(true);

      // Show video stream
      const videoElement = document.getElementById("videoElement");
      videoElement.srcObject = stream;

      // Ensure the video plays
      videoElement.onloadedmetadata = () => {
        videoElement.play();
      };
    } catch (err) {
      console.error("Error accessing the camera: ", err);
      alert("Failed to access camera: " + err.message); // Alert to notify user
    }
  };

  // Cleanup function to stop the camera stream
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  return (
    <div className="container">
      <h1>التعرف على الارقام العربية</h1>

      {/* Button to access camera */}
      <button className="button" onClick={handleOpenCamera} disabled={isCameraOpen}>
        Access Camera
      </button>

      {/* Video feed */}
      <video 
        id="videoElement" 
        className="video" 
        autoPlay 
        controls // Add controls for debugging
      />

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
