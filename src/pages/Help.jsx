import { useState, useEffect } from "react";

export default function Help() {
  const [step, setStep] = useState(0); // 0: Start, 1: Loading, 2: Games, 3: "Success" (fake)
  const [gameType, setGameType] = useState(0); // Randomly picks the minigame
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0); // To make them think they are progressing
  
  // Game States
  const [btnPos, setBtnPos] = useState({ top: "50%", left: "50%" });
  const [mathNum, setMathNum] = useState({ a: 0, b: 0 });
  const [mathInput, setMathInput] = useState("");

  // Step 1: The Fake Loading
  useEffect(() => {
    if (step === 1) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            nextRandomGame();
            return 100;
          }
          return prev + Math.random() * 1.5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [step]);

  const nextRandomGame = () => {
    setGameType(Math.floor(Math.random() * 4)); // 4 different annoying games
    setMathNum({ a: Math.floor(Math.random() * 999), b: Math.floor(Math.random() * 999) });
    setMathInput("");
    setStep(2);
  };

  const winGame = () => {
    setScore(score + 1);
    setLoading(true);
    // Instead of finishing, it just sends them back to a new loading bar
    setTimeout(() => {
      setLoading(false);
      setProgress(0);
      setStep(1); 
    }, 1000);
  };

  // Game 1: The Chasing Button
  const moveButton = () => {
    const top = Math.random() * 80 + "%";
    const left = Math.random() * 80 + "%";
    setBtnPos({ top, left });
  };

  return (
    <div className="container help-page">
      <div className="feed-header">
        <h2 className="pixel-font">TEAM ROCKET- HERE TO HELP!</h2>
        <p>Security Clearance Level: <span style={{color: '#facc15'}}>{score}</span></p>
        <p style={{fontSize: '10px'}}>Estimated Wait Time: <span style={{color: '#ef4444'}}>ETERNITY</span></p>
      </div>

      <div className="post-card frustration-card" style={{position: 'relative', overflow: 'hidden'}}>
        
        {step === 0 && (
          <div className="center-content">
            <p className="status-text">Identity verification required to access "Help" documentation.</p>
            <button className="create-btn" onClick={() => setStep(1)}>INITIALIZE PROTOCOL</button>
          </div>
        )}

        {step === 1 && (
          <div className="center-content">
            <p className="status-text">Syncing with Team Rocket Database...</p>
            <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: `${progress}%` }}></div></div>
            <p className="percent-text">{Math.floor(progress)}%</p>
          </div>
        )}

        {step === 2 && (
          <div className="game-container">
            
            {/* GAME 0: MATH FROM HELL */}
            {gameType === 0 && (
              <div className="center-content">
                <p className="status-text">Solve to prove you aren't a psychic type:</p>
                <h3 className="pixel-font" style={{marginBottom: '15px'}}>{mathNum.a} + {mathNum.b} x 0 + {mathNum.a}?</h3>
                <input className="create-input" type="number" value={mathInput} onChange={(e)=>setMathInput(e.target.value)} placeholder="Answer..." />
                <button className="create-btn" onClick={() => parseInt(mathInput) === (mathNum.a + mathNum.a) ? winGame() : setStep(0)}>SUBMIT</button>
              </div>
            )}

            {/* GAME 1: THE CHASING BUTTON */}
            {gameType === 1 && (
              <div style={{height: '200px'}}>
                <p className="status-text">Click the "Accept Terms" button to continue.</p>
                <button 
                  className="report-btn" 
                  onMouseEnter={moveButton}
                  onClick={winGame}
                  style={{position: 'absolute', top: btnPos.top, left: btnPos.left, transition: '0.1s', zIndex: 10}}
                >
                  ACCEPT TERMS
                </button>
              </div>
            )}

            {/* GAME 2: THE IMAGE TRAP */}
            {gameType === 2 && (
              <div className="center-content">
                <p className="status-text">Click the Pikachu (DO NOT CLICK THE MIMIKYU)</p>
                <div className="captcha-grid">
                  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/778.png" onClick={()=>setStep(0)} alt="mimikyu" />
                  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" onClick={winGame} alt="pikachu" />
                  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/778.png" onClick={()=>setStep(0)} alt="mimikyu" />
                </div>
              </div>
            )}

            {/* GAME 3: THE WAITING GAME */}
            {gameType === 3 && (
              <div className="center-content">
                <p className="status-text">Please wait for the "I AGREE" button to turn green.</p>
                <p className="tiny-text">(This can take up to 99 years)</p>
                <button className="create-btn" style={{filter: 'grayscale(1)', cursor: 'not-allowed'}} onClick={() => alert("PATIENCE, GRUNT!")}>I AGREE</button>
                <button className="report-btn" style={{marginTop: '10px'}} onClick={winGame}>SKIP (5,000 Pokedollars)</button>
              </div>
            )}

          </div>
        )}
      </div>
      <p className="tiny-text" style={{textAlign: 'center', marginTop: '20px'}}>© Team Rocket HR Department. Complaining is a fireable offense.</p>
    </div>
  );
}