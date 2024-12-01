import React, { useState } from 'react';
import axios from 'axios';

const Game = () => {
  const [positions, setPositions] = useState([]);
  const [showBall, setShowBall] = useState(null);
  const [result, setResult] = useState(null);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isBallHidden, setIsBallHidden] = useState(true);
  const [isGameActive, setIsGameActive] = useState(true); // Nuevo estado para controlar si los vasos están habilitados

  const startGame = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/start');
      setPositions(response.data.positions); // Posiciones iniciales
      setShowBall(null); // Oculta la pelota inicialmente
      setIsShuffled(false); // Resetea el estado de mezcla
      setIsBallHidden(true); // Oculta la pelota
      setResult(null); // Resetea el resultado
      setIsGameActive(true); // Habilita los vasos
    } catch (error) {
      console.error('Error al iniciar el juego:', error);
    }
  };

  const shuffleGame = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/start');
      setPositions(response.data.positions); // Nuevas posiciones
      setIsShuffled(true); // Marca como mezclado
      setIsBallHidden(true); // Oculta la pelota
      setResult(null); // Resetea el resultado
      setIsGameActive(true); // Habilita los vasos
    } catch (error) {
      console.error('Error al mezclar los vasos:', error);
    }
  };

  const makeGuess = (guess) => {
    if (!isGameActive) return; // Si el juego no está activo, no permite hacer más selecciones
    setIsBallHidden(false); // Revela la pelota
    setShowBall(positions[0]); // Muestra la posición de la pelota
    setResult(guess === positions[0] ? 'correct' : 'wrong');
    setIsGameActive(false); // Bloquea los vasos después de la selección
  };

  return (
    <div>
      <h1>Encuentra la Pelota</h1>
      <button onClick={startGame}>Jugar</button>
      <button onClick={shuffleGame} disabled={positions.length === 0}>
        Mezclar
      </button>
      <div className="vasos-container">
        {positions.map((pos, index) => (
          <div
            key={index}
            className={`vaso ${!isBallHidden && showBall === index + 1 ? 'red' : ''}`}
            onClick={() => makeGuess(index + 1)}
            style={{
              pointerEvents: isGameActive ? 'auto' : 'none', // Deshabilita los clics en los vasos si el juego no está activo
              opacity: isGameActive ? 1 : 0.5, // Visualmente indica que están deshabilitados
            }}
          >
            <p>Vaso {index + 1}</p>
          </div>
        ))}
      </div>
      {result && (
        <h2 className={`resultado ${result === 'wrong' ? 'wrong' : ''}`}>
          {result === 'correct' ? '¡wenaa pibe!' : 'Fracasado'}
        </h2>
      )}
    </div>
  );
};

export default Game;
