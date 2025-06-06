import React from 'react';
import './App.css';
import TicTacToeClassic from './TicTacToeClassic';

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app" style={{ background: "#f9fafb" }}>
      <main>
        <div className="container" style={{ display: "flex", justifyContent: "center" }}>
          <TicTacToeClassic />
        </div>
      </main>
    </div>
  );
}

export default App;