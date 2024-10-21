import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function App() {
  const [cameraStream, setCameraStream] = useState(null);
  const [textToCopy, setTextToCopy] = useState("Here is a string to copy!");

  const handleOpenCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      // Show video stream (optional)
      const videoElement = document.getElementById("videoElement");
      videoElement.srcObject = stream;
    } catch (err) {
      console.error("Error accessing the camera: ", err);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Phone Camera and Copy Text App</h1>

      {/* Button to access camera */}
      <button style={styles.button} onClick={handleOpenCamera}>
        Access Camera
      </button>

      {/* Video feed (optional, if you want to display the camera feed) */}
      <video id="videoElement" style={styles.video} autoPlay />

      {/* Text tab with a copy feature */}
      <div style={styles.copyContainer}>
        <p>{textToCopy}</p>
        <CopyToClipboard text={textToCopy}>
          <button style={styles.copyButton}>Copy Text</button>
        </CopyToClipboard>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  button: {
    padding: '10px 20px',
    fontSize: '18px',
    marginBottom: '20px',
    cursor: 'pointer',
    borderRadius: '5px',
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  copyContainer: {
    marginTop: '20px',
    textAlign: 'center',
  },
  copyButton: {
    padding: '8px 15px',
    backgroundColor: '#008CBA',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  video: {
    width: '300px',
    height: '300px',
    marginTop: '20px',
    border: '2px solid #ccc',
  },
};

export default App;
