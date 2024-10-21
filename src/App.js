import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './App.css'; // Import the CSS file

function App() {
  const [cameraStream, setCameraStream] = useState(null);
  const [textToCopy, setTextToCopy] = useState("هنا انسخ الارقام ");
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const handleOpenCamera = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const backCamera = devices.find(device =>
        device.kind === 'videoinput' && device.label.toLowerCase().includes('environment')
      );

      if (!backCamera) {
        console.error('Back camera not found.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: backCamera.deviceId } }
      });
      setCameraStream(stream);
      setIsCameraOpen(true);

      const videoElement = document.getElementById("videoElement");
      videoElement.srcObject = stream;

      videoElement.onloadedmetadata = () => {
        videoElement.play();
      };
    } catch (err) {
      console.error("Error accessing the camera: ", err);
      alert("Failed to access camera: " + err.message);
    }
  };

  const handleCaptureImage = () => {
    const videoElement = document.getElementById("videoElement");
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Set canvas size to match the video dimensions
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    // Draw the video frame to the canvas
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    // Convert canvas to data URL
    const imageData = canvas.toDataURL('image/png');
    setCapturedImage(imageData);

    // Optionally, stop the camera stream
    stopCamera();
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
      setIsCameraOpen(false);
    }
  };

  // Cleanup function to stop the camera stream
  useEffect(() => {
    return () => {
      stopCamera();
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
        controls 
      />

      {/* Button to capture image */}
      {isCameraOpen && (
        <button className="button" onClick={handleCaptureImage}>
          Capture Image
        </button>
      )}

      {/* Display captured image */}
      {capturedImage && (
        <div>
          <h2>Captured Image</h2>
          <img src={capturedImage} alt="Captured" className="captured-image" />
        </div>
      )}

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
