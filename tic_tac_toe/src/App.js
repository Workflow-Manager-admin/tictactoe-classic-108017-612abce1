import React from 'react';
import './App.css';
import TicTacToeClassic from './TicTacToeClassic';

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app" style={{ background: "#f9fafb" }}>
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <span
              className="btn"
              style={{
                background: "#1976D2",
                color: "#FFFFFF",
                fontWeight: 500,
                fontSize: 15,
                borderRadius: 5,
                padding: "9px 20px",
                cursor: "default"
              }}
            >
              TicTacToe Classic
            </span>
          </div>
        </div>
      </nav>
      <main>
        <div className="container" style={{ display: "flex", justifyContent: "center" }}>
          <TicTacToeClassic />
        </div>
      </main>
    </div>
  );
}

export default App;