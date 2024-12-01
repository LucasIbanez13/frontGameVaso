import React, { useState } from 'react';
import axios from 'axios';

const Game = () => {
  const [positions, setPositions] = useState([]);
  const [showBall, setShowBall] = useState(null);
  const [result, setResult] = useState(null);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isBallHidden, setIsBallHidden] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);

  const startGame = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/start');
      setPositions(response.data.positions); // Posiciones iniciales
      setShowBall(null); // Oculta la pelota
      setIsShuffled(false); // Resetea el estado de mezcla
      setIsBallHidden(false); // Muestra la pelota inicialmente
      setResult(null); // Resetea el resultado
      setIsDisabled(false); // Desbloquea los vasos
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
      setIsDisabled(false); // Desbloquea los vasos
    } catch (error) {
      console.error('Error al mezclar los vasos:', error);
    }
  };

  const makeGuess = (guess) => {
    setIsBallHidden(false); // Revela la pelota
    setShowBall(positions[0]); // Muestra la posición correcta
    setResult(guess === positions[0] ? 'correct' : 'wrong'); // Resultado de la adivinanza
    setIsDisabled(true); // Bloquea los vasos después de hacer una selección
  };

  return (
    <div>
      <div className='juega'>
      <h1>Encuentra la Pelota</h1>
      <button className='jugar' onClick={startGame}>Jugar</button>
      <button className='mezclar' onClick={shuffleGame} disabled={positions.length === 0}>
        Mezclar
      </button>
      </div>
      
      <div className="vasos-container">
        {positions.map((pos, index) => (
          <div
            key={index}
            className="vaso"
            onClick={() => !isDisabled && makeGuess(index + 1)} // Solo permite seleccionar si no están deshabilitados
            style={{
              pointerEvents: isDisabled ? 'none' : 'auto', // Bloquea clics en vasos deshabilitados
            }}
          >
            <p>Vaso {index + 1}</p>
            <div className="pelota-container">
              {!isBallHidden && showBall === index + 1 && (
                <div className="pelota"></div> // Pelota independiente
              )}
            </div>
            
          </div>
        ))}
      </div>
      {result && (
        <h2 className={`resultado ${result === 'wrong' ? 'wrong' : ''}`}>
          {result === 'correct' ? '¡Wenaa pibe!' : '¡NA NA NA MAL!'}
        </h2>
      )}
    </div>
  );
};

export default Game;
