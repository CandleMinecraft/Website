import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to CandleMC</h1>
        <p>Where community and creativity meet technology</p>
        <a href="https://github.com/candleminecraft/Candle/releases" target="_blank" rel="noopener noreferrer" className="primary-button">
          Get started
        </a>
      </header>
      <section className="App-content">
        <div className="card">
          <h2>About Us</h2>
          <p>
            We are passionate about delivering innovative experiences through technology, design, and community.
          </p>
        </div>
        <div className="card">
          <h2>Our Services</h2>
          <p>
            Explore our creative solutions, custom builds, and community-driven projects designed just for you.
          </p>
        </div>
      </section>
      
      <div className="disclaimer-card">
          <h3>Disclaimer</h3>
          <p>
            CandleMC is not affiliated with Mojang AB. Minecraft is a trademark of Mojang AB, and we respect their rights and guidelines.
          </p>
        </div>
      <footer className="App-footer">
        <p>&copy; 2025 CandleMC. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;