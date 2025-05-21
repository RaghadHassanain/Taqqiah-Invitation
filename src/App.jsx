import { useState, useRef, useEffect } from 'react';
import './App.css';
import backgroundImage from './assets/TAQ.png';
import logoImage from './assets/TAQLOGO.png';

function App() {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const canvasRef = useRef(null);

  const generateImage = () => {
    if (!name.trim()) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 1080;
    const img = new Image();
    img.src = backgroundImage;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.font = 'bold 72px Montserrat, Arial, Helvetica, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;
      ctx.fillText(name, canvas.width / 2, canvas.height * 0.30);
      setImageUrl(canvas.toDataURL('image/png'));
    };
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.download = `${name}-generated-image.png`;
    link.href = imageUrl;
    link.click();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      generateImage();
    }
  };

  return (
    <div className="app">
      <img src={logoImage} alt="TAQ Logo" className="logo-image" />
      <h1>Type Your Name to Reveal Your Invitation</h1>
      <div className="input-container">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter your name"
          className="name-input"
        />
        <button onClick={generateImage} className="generate-btn">
          Generate
        </button>
      </div>
      <div className="image-container">
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        {imageUrl && (
          <>
            <img src={imageUrl} alt="Generated" className="generated-image" />
            <button onClick={handleDownload} className="download-btn">
              Download Image
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
