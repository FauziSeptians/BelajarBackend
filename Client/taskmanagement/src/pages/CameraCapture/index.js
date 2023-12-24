import { useState, useRef } from 'react';

export default function CameraCapture() {
  const videoRef = useRef(null);
  const [imageData, setImageData] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const captureImage = () => {
    const canvas = document.createElement('canvas');
    const video = videoRef.current;

    if (video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageDataURL = canvas.toDataURL('image/png');

      // Convert data URL to Blob
      const byteString = atob(imageDataURL.split(',')[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: 'image/png' });

      // Create FormData and append the image file
      const formData = new FormData();
      formData.append('photo', blob, 'image.png');
      console.log(formData);

      // Now you can send formData using fetch or any HTTP library
      // For example:
      // fetch('/upload', {
      //   method: 'POST',
      //   body: formData,
      // });
      
      setImageData(imageDataURL);
    }
  };

  return (
    <div>
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={captureImage}>Capture Image</button>
      <video ref={videoRef} style={{ display: 'block', width: '100%', maxWidth: '500px' }} />
      {imageData && <img src={imageData} alt="Captured" />}
    </div>
  );
}
