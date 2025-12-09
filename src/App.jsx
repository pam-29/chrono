import { useEffect, useState } from 'react';
import './App.scss'

function App() {

  const [countDown, setCountDown] = useState(1500);
  const [isRunning, setIsRunning] = useState(false); 
  const [mode, setMode] = useState("work");

  useEffect(() => {
    let interval = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        setCountDown(prevCountDown => {
          if (prevCountDown > 0) {
            return prevCountDown - 1;
          } else {
            if (mode === "work") {
              setMode("break"); 
              return 300; 
            } else {
              setMode("work"); 
              return 1500; 
            }
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, mode]);

  const minut = Math.floor(countDown/60);
  const second = countDown % 60;

  return (
    <div>
        <img src="/logo.svg" alt="logo de l'application" />

        <div className='timer'>
          <p>{minut}: {second < 10 ? "0" + second : second}</p>
        </div>

        <div >
          <button className='btn btn-start' onClick={()=>setIsRunning(true)}>lancer</button>
        </div>

        <div>
          <button className='btn btn-break' onClick={()=>setIsRunning(false)}>pause</button>
        </div>

        <div>
          <button className='btn btn-reset' onClick={()=>{setIsRunning(false), setCountDown(1500);}}
          >reset</button>
        </div>
    </div>
  )
}

export default App
